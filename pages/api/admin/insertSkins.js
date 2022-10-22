import fs from "fs/promises";
import connectDB from "../../../lib/database/connectMongoDb";
import clientPromise from "../../../lib/database/mongodb";
import Skin from "../../../lib/database/schemas/skin";
import Skingroup from "../../../lib/database/schemas/skingroup";

const handler = async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({ error: "invalid method" });

  let skinFile;
  try {
    skinFile = await fs.readFile("./skins.json", { encoding: "utf-8" });
    skinFile = JSON.parse(skinFile);
  } catch (ex) {
    return res.status(500).json(ex);
  }

  let skingroups = [];
  for (const [key, value] of Object.entries(skinFile.items_list)) {
    const skin = skinFile.items_list[key];
    if (
      skin.type === "Weapon" ||
      skin.type === "Knifes" ||
      skin.type === "Gloves"
    ) {
      const price = skin.price
        ? skin.price["24_hours"]
          ? skin.price["24_hours"].average
          : skin.price["7_days"]
          ? skin.price["7_days"].average
          : skin.price["30_days"]
          ? skin.price["30_days"].average
          : skin.price["all_time"]
          ? skin.price["all_time"].average
          : null
        : null;

      //exterior
      let exterior = skin.exterior;
      if (!skin.exterior) {
        exterior = skin.name.split("(").pop();
        exterior = exterior.split(")").shift();
      }

      const newSkin = new Skin({
        name: skin.name,
        classId: skin.classid,
        iconUrl: skin.icon_url,
        type: skin.type,
        weaponType: skin.weapon_type,
        gunType: skin.type === "Weapon" ? skin.gun_type : null,
        knifeType: skin.weapon_type === "Knife" ? skin.knife_type : null,
        exterior: exterior,
        rarity: skin.rarity,
        rarityColor: skin.rarity_color,
        price: price,
        statTrak: skin.stattrak,
        souvenir: skin.souvenir,
      });
      await newSkin.save();

      //create skingroups

      //remove star and tm icon
      let formattedName = skin.name.split("\u2122").pop();
      formattedName = formattedName.split("\u2605").pop();
      //if souvenir remove souvenir string
      if (skin.souvenir === 1) {
        formattedName = formattedName.split("Souvenir").pop();
      }
      //remove exterior
      formattedName = formattedName.split(`(${exterior})`).shift();

      //remove whitespaces
      formattedName = formattedName.trim();

      /* const exists = skingroups.filter((skingroup) => {
        return skingroup.name === formattedName;
      }); */

      const index = skingroups.findIndex(
        (skingroup) => skingroup.name === formattedName
      );
      if (index >= 0) {
        skingroups[index].skinIds.push(skin.classid);
      } else {
        skingroups.push({
          name: formattedName,
          iconUrl: skin.iconUrl,
          type: skin.type,
          weaponType: skin.weapon_type,
          gunType: skin.type === "Weapon" ? skin.gun_type : null,
          knifeType: skin.weapon_type === "Knife" ? skin.knife_type : null,
          rarity: skin.rarity,
          rarityColor: skin.rarity_color,
          skinIds: [skin.classid],
        });
      }
    }
    //console.log(skinFile.items_list[key].type);
  }
  //push skingroups to database
  for (const skingroup of skingroups) {
    const newSkinGroup = new Skingroup(skingroup);
    await newSkinGroup.save();
  }
};
export default connectDB(handler);
