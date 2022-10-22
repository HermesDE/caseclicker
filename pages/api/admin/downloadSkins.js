import connectDB from "../../../lib/database/connectMongoDb";
import fs from "fs/promises";
import download from "image-downloader";
import path from "path";

async function handler(req, res) {
  const file = await fs.readFile("./skins.json", { encoding: "utf-8" });
  const skinFile = JSON.parse(file);

  for (const [key, value] of Object.entries(skinFile.items_list)) {
    const skin = skinFile.items_list[key];
    if (
      skin.type === "Weapon" ||
      skin.type === "Knifes" ||
      skin.type === "Gloves"
    ) {
      await download.image({
        url:
          "https://steamcommunity-a.akamaihd.net/economy/image/" +
          skin.icon_url,
        dest:
          path.resolve() +
          "\\public\\pictures\\skins\\" +
          skin.icon_url +
          ".png",
      });

      //console.log(await imageBlob.arrayBuffer());
    }
  }
  res.json({ message: "ok" });
}
export default connectDB(handler);
