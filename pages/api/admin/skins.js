import connectDB from "../../../lib/database/connectMongoDb";
import Skin from "../../../lib/database/schemas/skin";

const handler = async (req, res) => {
  const skins = await Skin.find({});
  res.json(skins);
};
export default connectDB(handler);
