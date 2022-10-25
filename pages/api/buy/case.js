import connectDB from "../../../lib/database/connectMongoDb";
import UserStat from "../../../lib/database/schemas/userStat";
import Case from "../../../lib/database/schemas/case";
import SkinGroup from "../../../lib/database/schemas/skingroup";
import Skin from "../../../lib/database/schemas/skin";
import { getToken } from "next-auth/jwt";
import OpenedSkin from "../../../lib/database/schemas/openedSkin";

const generateFloat = (exteriors) => {
  const float = Math.random();

  switch (float) {
    case float < 0.07 &&
      exteriors.find((e) => e === "Factory New") === undefined:
      return generateFloat(exteriors);
      break;
    case float < 0.15 &&
      exteriors.find((e) => e === "Minimal Wear") === undefined:
      return generateFloat(exteriors);
      break;
    case float < 0.38 &&
      exteriors.find((e) => e === "Field-Tested") === undefined:
      return generateFloat(exteriors);
      break;
    case float < 0.45 && exteriors.find((e) => e === "Well-Worn") === undefined:
      return generateFloat(exteriors);
      break;
    case float < 1 &&
      exteriors.find((e) => e === "Battle-Scarred") === undefined:
      console.log("new float");
      return generateFloat(exteriors);
      break;
    default:
      return float;
      break;
  }

  /* if (
      float < 0.07 &&
      float >= 0 &&
      exteriors.find((e) => e === "Factory New") === undefined
    ) {
      generateFloat(exteriors);
    } else if (
      float < 0.15 &&
      float >= 0.07 &&
      exteriors.find((e) => e === "Minimal Wear") === undefined
    ) {
      generateFloat(exteriors);
    } else if (
      float < 0.38 &&
      float >= 0.15 &&
      exteriors.find((e) => e === "Field-Tested") === undefined
    ) {
      generateFloat(exteriors);
    } else if (
      float < 0.45 &&
      float >= 0.38 &&
      exteriors.find((e) => e === "Well-Worn") === undefined
    ) {
      generateFloat(exteriors);
    } else if (
      float < 1 &&
      float >= 0.45 &&
      exteriors.find((e) => e === "Battle-Scarred") === undefined
    ) {
      generateFloat(exteriors);
    } */
};

async function handler(req, res) {
  const token = await getToken({ req });
  const userId = token.id;

  const userStat = await UserStat.findOne({ userId: userId });
  const caseToBuy = await Case.findById(req.body.id);

  //check if user has enough money
  if (userStat.money < caseToBuy.price)
    return res.status(403).json({ error: "you dont have enough money" });

  //delete money from database
  userStat.money -= caseToBuy.price;
  await userStat.save();

  //gamble the skin
  const skingroups = await SkinGroup.find({ _id: caseToBuy.skingroups });

  //find random rarity
  const randomRarity = Math.floor(Math.random() * 1000) + 1;
  let rarity,
    knifeType,
    weaponType,
    statTrak = false;
  if (randomRarity <= 800) {
    rarity = "Mil-Spec Grade";
    knifeType = null;
  } else if (randomRarity <= 960) {
    rarity = "Restricted";
    knifeType = null;
  } else if (randomRarity <= 990) {
    rarity = "Classified";
    knifeType = null;
  } else if (randomRarity <= 997) {
    rarity = "Covert";
    knifeType = null;
  } else if (randomRarity <= 1000) {
    rarity = "Covert";
    weaponType = "Knife";
  }

  //randomize if weapon gets stattrak
  const randomStatTrak = Math.floor(Math.random() * 10) + 1;
  if (randomStatTrak === 7) statTrak = true;

  //filter skingroup by rarity
  let filteredSkingroups;
  if (weaponType) {
    filteredSkingroups = skingroups.filter(
      (skingroup) => skingroup.weaponType === weaponType
    );
  } else {
    filteredSkingroups = skingroups.filter(
      (skingroup) =>
        skingroup.rarity === rarity && skingroup.knifeType === knifeType
    );
  }

  console.log(filteredSkingroups);

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
  const float = generateFloat(exteriors);

  //pick skin by float
  let skin;
  if (float <= 0.07) {
    skin = filteredSkins.find((skin) => skin.exterior === "Factory New");
  } else if (float <= 0.15) {
    skin = filteredSkins.find((skin) => skin.exterior === "Minimal Wear");
  } else if (float <= 0.38) {
    skin = filteredSkins.find((skin) => skin.exterior === "Field-Tested");
  } else if (float <= 0.45) {
    skin = filteredSkins.find((skin) => skin.exterior === "Well-Worn");
  } else if (float <= 1) {
    skin = filteredSkins.find((skin) => skin.exterior === "Battle-Scarred");
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
    userId: userId,
    openedAt: new Date(),
  });
  await newOpenedSkin.save();
  await UserStat.findOneAndUpdate(
    { userId: userId },
    { $inc: { openedCases: 1 } }
  );

  res.json(newOpenedSkin);
}
export default connectDB(handler);
