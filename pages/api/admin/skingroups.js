import connectDB from "../../../lib/database/connectMongoDb";
import Skingroup from "../../../lib/database/schemas/skingroup";

const handler = async (req, res) => {
  const skingroups = await Skingroup.find({});
  res.json(skingroups);
};
export default connectDB(handler);
