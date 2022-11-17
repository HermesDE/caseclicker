import connectDB from "../../lib/database/connectMongoDb";
import CustomCase from "../../lib/database/schemas/customCase";
import Skingroup from "../../lib/database/schemas/skingroup";
import Skin from "../../lib/database/schemas/skin";

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const customCases = await CustomCase.find({ active: true });
      res.json(customCases);
      break;
    case "PATCH":
      const { id } = req.body;
      const customCase = await CustomCase.findById(id);
      let caseSkingroups = [];
      let percentages = [];
      for (const skingroup of customCase.skingroups) {
        caseSkingroups.push(skingroup.skingroup);
        percentages.push(skingroup.percentage);
      }

      const skingroups = await Skingroup.find({ _id: caseSkingroups });

      let caseSkins = [];
      for (const [i, skingroup] of skingroups.entries()) {
        const skins = await Skin.find({ classId: skingroup.skinIds });

        skins.sort((a, b) => a.price - b.price);
        caseSkins.push({
          name: skingroup.name,
          rarity: skingroup.rarity,
          rarityColor: skingroup.rarityColor,
          minPrice: skins[0].price,
          maxPrice: skins[skins.length - 1].price,
          iconUrl: skins[skins.length - 1].iconUrl,
          percentage: percentages.filter((percentage, i) => {
            if (caseSkingroups[i] === skingroup.id) {
              return percentages[i];
            }
          }),
        });
      }
      caseSkins = caseSkins.sort((a, b) => b.percentage - a.percentage);
      res.json(caseSkins);
      break;
    default:
      break;
  }
}
export default connectDB(handler);
