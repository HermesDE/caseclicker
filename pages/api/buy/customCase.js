import connectDB from "../../../lib/database/connectMongoDb";
import UserStat from "../../../lib/database/schemas/userStat";
import CustomCase from "../../../lib/database/schemas/customCase";
import SkinGroup from "../../../lib/database/schemas/skingroup";
import Skin from "../../../lib/database/schemas/skin";
import { getToken } from "next-auth/jwt";
import OpenedSkin from "../../../lib/database/schemas/openedSkin";
import generateFloat from "../../../lib/float";
import weightedRandom from "../../../lib/weightedRandom";
import Skingroup from "../../../lib/database/schemas/skingroup";

async function handler(req, res) {
  const token = await getToken({ req });
  const userId = token.id;

  const userStat = await UserStat.findOne({ userId: userId });
  const caseToBuy = await CustomCase.findById(req.body.id);
  const { quickOpen } = req.body;

  //check if user has enough money
  if (userStat.money < caseToBuy.price)
    return res.status(403).json({ error: "you dont have enough money" });

  //check if user has enough openedCases
  if (userStat.openedCases < caseToBuy.neededOpenedCases) {
    return res.status(403).json({ error: "you didn't unlock the case" });
  }

  const randomSkinGroup = weightedRandom(caseToBuy.skingroups);
  const skingroup = await SkinGroup.findById(randomSkinGroup);
  const skins = await Skin.find({ classId: skingroup.skinIds });

  let statTrak;
  const randomStatTrak = Math.floor(Math.random() * 10) + 1;
  if (randomStatTrak === 7) statTrak = true;
  if (skins[0].type === "Gloves") statTrak = false;

  let filteredSkins;
  if (statTrak) {
    filteredSkins = skins.filter((skin) => skin.statTrak === true);
  } else {
    filteredSkins = skins.filter((skin) => skin.statTrak !== true);
  }

  const exteriors = filteredSkins.map((skin) => skin.exterior);
  const randomExterior =
    exteriors[[Math.floor(Math.random() * exteriors.length)]];
  const skin = filteredSkins.find((skin) => skin.exterior === randomExterior);
  let float;
  if (
    randomExterior === "Factory New" ||
    randomExterior === "Minimal Wear" ||
    randomExterior === "Field-Tested" ||
    randomExterior === "Well-Worn" ||
    randomExterior === "Battle-Scarred"
  ) {
    float = generateFloat(randomExterior);
  }

  const newOpenedSkin = new OpenedSkin({
    name: skin.name,
    classId: skin.classId,
    iconUrl: skin.iconUrl,
    type: skin.type,
    weaponType: skin.weaponType,
    gunType: skin.gunType,
    knifeType: skin.knifeType,
    exterior: skin.exterior,
    rarity: skin.rarity,
    rarityColor: skin.rarityColor,
    price: skin.price,
    float: float,
    statTrak: statTrak,
    souvenir: skin.souvenir ? true : false,
    userId: userId,
    openedAt: new Date(),
  });
  await newOpenedSkin.save();
  await UserStat.findOneAndUpdate(
    { userId: userId },
    {
      $inc: {
        openedCases: 1,
        money: -caseToBuy.price,
        moneySpent: caseToBuy.price,
        xp: caseToBuy.price * 0.5,
      },
    }
  );

  await CustomCase.findByIdAndUpdate(caseToBuy._id, {
    $inc: {
      moneySpend: +caseToBuy.price,
      moneyEarned: +skin.price,
      openedCount: +1,
    },
  });

  if (quickOpen) {
    return res.json(newOpenedSkin);
  }

  let allSkins = [];
  let allSkingroups = [];
  for (const skingroup of caseToBuy.skingroups) {
    allSkingroups.push(skingroup.skingroup);
  }
  allSkingroups = await Skingroup.find({ _id: allSkingroups });
  for (const skingroup of allSkingroups) {
    const skins = await Skin.find({ classId: skingroup.skinIds });
    for (let s of skins) {
      s._doc = { ...s._doc, skingroup: skingroup.id };
      allSkins.push(s);
    }
  }

  res.json({
    skins: allSkins,
    skingroups: caseToBuy.skingroups,
    newOpenedSkin,
  });
}
export default connectDB(handler);
