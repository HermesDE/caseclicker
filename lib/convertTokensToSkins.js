import OpenedSkin from "./database/schemas/openedSkin";
import Skin from "./database/schemas/skin";
import UserStat from "./database/schemas/userStat";
import generateFloat from "./float";

export default async function convertTokensToSkins(tokens, userId) {
  const price = tokens / 10;
  const skins = [];
  if (price <= 100) {
    const prices = [price];

    for (let i = 0; i < prices.length; i++) {
      const newOpenedSkin = await findAndSaveSkin(prices[i], userId);
      skins.push(newOpenedSkin);
    }
  } else if (price <= 1000) {
    const prices = [price * 0.5, price * 0.25, price * 0.25];
    for (let i = 0; i < prices.length; i++) {
      const newOpenedSkin = await findAndSaveSkin(prices[i], userId);
      skins.push(newOpenedSkin);
    }
  } else if (price <= 3000) {
    const prices = [
      price * 0.3334,
      price * 0.16667,
      price * 0.16667,
      price * 0.16667,
      price * 0.16667,
    ];
    for (let i = 0; i < prices.length; i++) {
      const newOpenedSkin = await findAndSaveSkin(prices[i], userId);
      skins.push(newOpenedSkin);
    }
  } else if (price <= 5000) {
    const prices = [
      price * 0.5,
      price * 0.25,
      price * 0.125,
      price * 0.0625,
      price * 0.0625,
    ];
    for (let i = 0; i < prices.length; i++) {
      const newOpenedSkin = await findAndSaveSkin(prices[i], userId);
      skins.push(newOpenedSkin);
    }
  } else if (price <= 10000) {
    const prices = [
      price * 0.3334,
      price * 0.16667,
      price * 0.16667,
      price * 0.16667,
      price * 0.16667,
    ];
    for (let i = 0; i < prices.length; i++) {
      const newOpenedSkin = await findAndSaveSkin(prices[i], userId);
      skins.push(newOpenedSkin);
    }
  } else {
    let remainingPrice = price;
    let min = 1000,
      max = 5000;

    while (remainingPrice > 0) {
      let randomPrice = Math.floor(Math.random() * (max - min + 1) + min);
      if (randomPrice > remainingPrice) {
        randomPrice = remainingPrice;
      }
      remainingPrice -= randomPrice;

      const newOpenedSkin = await findAndSaveSkin(randomPrice, userId);
      skins.push(newOpenedSkin);
    }
  }

  return skins;
}

const findAndSaveSkin = async (price, userId) => {
  const skins = await Skin.find({
    price: { $lte: price * 1.05, $gte: price * 0.95 },
  });
  let randomSkin = skins[Math.floor(Math.random() * skins.length)];
  const newSkin = {
    name: randomSkin.name,
    classId: randomSkin.classId,
    iconUrl: randomSkin.iconUrl,
    type: randomSkin.type,
    knifeType: randomSkin.knifeType,
    exterior: randomSkin.exterior,
    rarity: randomSkin.rarity,
    rarityColor: randomSkin.rarityColor,
    price: randomSkin.price,
    statTrak: randomSkin.statTrak,
    souvenir: randomSkin.souvenir,
    float: generateFloat(randomSkin.exterior),
    userId,
    openedAt: new Date(),
  };
  const newOpenedSkin = new OpenedSkin(newSkin);
  await newOpenedSkin.save();
  return newOpenedSkin;
};
