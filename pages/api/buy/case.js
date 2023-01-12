import connectDB from "../../../lib/database/connectMongoDb";
import UserStat from "../../../lib/database/schemas/userStat";
import Case from "../../../lib/database/schemas/case";
import SkinGroup from "../../../lib/database/schemas/skingroup";
import Skin from "../../../lib/database/schemas/skin";
import { getToken } from "next-auth/jwt";
import OpenedSkin from "../../../lib/database/schemas/openedSkin";
import generateFloat from "../../../lib/float";
import xpToRank from "../../../lib/xpToRank";

async function handler(req, res) {
  const token = await getToken({ req });
  const userId = token.id;

  const userStat = await UserStat.findOne({ userId: userId });
  const caseToBuy = await Case.findById(req.body.id);
  const { quickOpen } = req.body;
  const rank = xpToRank(userStat.xp);

  //check if user has enough money
  if (userStat.money < caseToBuy.price)
    return res.status(403).json({ error: "you dont have enough money" });

  //check if user has required rank
  if (rank.id < caseToBuy.rankNeeded) {
    return res.status(403).json({ error: "you didn't unlock the case" });
  }

  //gamble the skin
  const skingroups = await SkinGroup.find({ _id: caseToBuy.skingroups });

  //find random rarity
  const randomRarity = Math.floor(Math.random() * 1000) + 1;
  let rarity,
    knifeType,
    weaponType,
    type,
    statTrak = false;
  if (randomRarity <= 750) {
    rarity = "Mil-Spec Grade";
    knifeType = null;
  } else if (randomRarity <= 900) {
    rarity = "Restricted";
    knifeType = null;
  } else if (randomRarity <= 950) {
    rarity = "Classified";
    knifeType = null;
  } else if (randomRarity <= 980) {
    rarity = "Covert";
    knifeType = null;
  } else if (randomRarity <= 1000) {
    if (caseToBuy.specialItem === "knife") {
      rarity = "Covert";
      weaponType = "Knife";
    } else {
      rarity = "Extraordinary";
      type = "Gloves";
    }
  }

  //randomize if weapon gets stattrak
  const randomStatTrak = Math.floor(Math.random() * 10) + 1;
  if (randomStatTrak === 7) statTrak = true;
  if (type === "Gloves") statTrak = false;

  //filter skingroup by rarity
  let filteredSkingroups;
  if (weaponType) {
    filteredSkingroups = skingroups.filter(
      (skingroup) => skingroup.weaponType === weaponType
    );
  } else if (type) {
    filteredSkingroups = skingroups.filter(
      (skingroup) => skingroup.type === type
    );
  } else {
    filteredSkingroups = skingroups.filter(
      (skingroup) =>
        skingroup.rarity === rarity && skingroup.knifeType === knifeType
    );
  }

  //get one random skingroup from the filtered rarity
  const randomSkinGroup =
    filteredSkingroups[Math.floor(Math.random() * filteredSkingroups.length)];

  //get all skins from the filtered skingroup
  const skins = await Skin.find({ classId: randomSkinGroup.skinIds });

  //filter stattrak or non stattrak out by random result above
  let filteredSkins;
  if (statTrak) {
    filteredSkins = skins.filter((skin) => skin.statTrak === true);
  } else {
    filteredSkins = skins.filter((skin) => skin.statTrak !== true);
  }

  //create array of exteriors to create float
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
        moneySpent: caseToBuy.price,
        xp: caseToBuy.price * 0.5,
      },
    }
  );
  //delete money from database
  userStat.money -= caseToBuy.price;
  await userStat.save();

  await Case.findByIdAndUpdate(caseToBuy._id, {
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
  for (const skingroup of skingroups) {
    if (skingroup.weaponType === "Knife" || skingroup.type === "Gloves")
      continue;
    const s = await Skin.find({ classId: skingroup.skinIds });
    for (const skin of s) {
      allSkins.push(skin);
    }
  }

  res.json({ skins: allSkins, newOpenedSkin });
}
export default connectDB(handler);
