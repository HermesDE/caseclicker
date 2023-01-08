import dbConnect from "../../../lib/database/connectMongoDb";
import Skin from "../../../lib/database/schemas/skin";
import OpenedSkin from "../../../lib/database/schemas/openedSkin";
import MarketplaceSkin from "../../../lib/database/schemas/marketplaceSkin";
import fs from "fs/promises";

async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(406).json({ error: "invalid method" });

  let updatedSkins = 0;
  const response = await fetch("http://csgobackpack.net/api/GetItemsList/v2/");
  if (!response.ok) {
    return res.status(500).json({ error: await response.json() });
  }
  const data = await response.json();
  /* let data = await fs.readFile("./newSkins.json", { encoding: "utf-8" });
  data = JSON.parse(data); */
  const newSkinList = data.items_list;

  //get all skins from database that needs to be changed
  const currentSkins = await Skin.find({});
  const openedSkins = await OpenedSkin.find({});
  const marketplaceSkins = await MarketplaceSkin.find({});

  // create array with all the new skins
  let newSkinArray = [];
  for (const [key, value] of Object.entries(newSkinList)) {
    const newSkin = newSkinList[key];
    if (
      newSkin.type === "Weapon" ||
      newSkin.type === "Knifes" ||
      newSkin.type === "Gloves"
    ) {
      newSkinArray.push(newSkin);
    }
  }
  //apply new prices to the skins
  for (const skin of currentSkins) {
    const newSkin = newSkinArray.find((obj) => {
      return obj.classid === skin.classId;
    });
    if (!newSkin) continue;

    const newPrice = newSkin.price
      ? newSkin.price["24_hours"]
        ? newSkin.price["24_hours"].average
        : newSkin.price["7_days"]
        ? newSkin.price["7_days"].average
        : newSkin.price["30_days"]
        ? newSkin.price["30_days"].average
        : null
      : null;

    //check if new price is valid
    if (!newPrice) continue;
    if (
      newPrice / skin.price < 0.75 ||
      newPrice / skin.price > 1.5 ||
      newPrice / skin.price === 1
    ) {
      continue;
    }

    //apply new price to old skin
    skin.price = newPrice;
    await skin.save();
    updatedSkins++;
  }

  //apply new prices to the opened skins
  for (const skin of openedSkins) {
    const newSkin = newSkinArray.find((obj) => {
      return obj.classid === skin.classId;
    });
    if (!newSkin) continue;

    const newPrice = newSkin.price
      ? newSkin.price["24_hours"]
        ? newSkin.price["24_hours"].average
        : newSkin.price["7_days"]
        ? newSkin.price["7_days"].average
        : newSkin.price["30_days"]
        ? newSkin.price["30_days"].average
        : null
      : null;

    //check if new price is valid
    if (!newPrice) continue;
    if (
      newPrice / skin.price < 0.75 ||
      newPrice / skin.price > 1.5 ||
      newPrice / skin.price === 1
    ) {
      continue;
    }

    //apply new price to old skin
    skin.price = newPrice;
    await skin.save();
    updatedSkins++;
  }

  //apply new prices to the marketplace skins
  for (const skin of marketplaceSkins) {
    const newSkin = newSkinArray.find((obj) => {
      return obj.classid === skin.openedSkin.classId;
    });
    if (!newSkin) continue;

    const newPrice = newSkin.price
      ? newSkin.price["24_hours"]
        ? newSkin.price["24_hours"].average
        : newSkin.price["7_days"]
        ? newSkin.price["7_days"].average
        : newSkin.price["30_days"]
        ? newSkin.price["30_days"].average
        : null
      : null;

    //check if new price is valid
    if (!newPrice) continue;
    if (
      newPrice / skin.openedSkin.price < 0.75 ||
      newPrice / skin.openedSkin.price > 1.5 ||
      newPrice / skin.openedSkin.price === 1
    ) {
      continue;
    }

    //apply new price to old skin
    skin.openedSkin.price = newPrice;
    await skin.save();
    updatedSkins++;
  }
  res.json({ message: "ok", updatedSkins });
}
export default dbConnect(handler);
