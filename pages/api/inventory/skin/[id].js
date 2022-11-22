import connectDB from "../../../../lib/database/connectMongoDb";
import SkinGroup from "../../../../lib/database/schemas/skingroup";
import Skin from "../../../../lib/database/schemas/skin";

async function handler(req, res) {
  const { id } = req.query;

  const skingroup = await SkinGroup.findOne({ skinIds: id });
  let skins = await Skin.find({ classId: skingroup.skinIds });
  skins = skins.sort((a, b) => b.price - a.price);

  res.json({ skingroup, skins });
}
export default connectDB(handler);
