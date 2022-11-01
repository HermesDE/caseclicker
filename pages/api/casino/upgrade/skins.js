import connectDB from "../../../../lib/database/connectMongoDb";
import { getToken } from "next-auth/jwt";
import OpenedSkin from "../../../../lib/database/schemas/openedSkin";
import Skin from "../../../../lib/database/schemas/skin";

async function handler(req, res) {
  const token = await getToken({ req });
  const { id } = req.body;
  switch (req.method) {
    case "POST":
      const userSkin = await OpenedSkin.findById(id);
      if (!userSkin) {
        return res
          .status(404)
          .json({ error: "No skin found with the given id" });
      }
      const upgradeSkins = await Skin.find({
        price: { $gte: userSkin.price * 1.1, $lte: userSkin.price * 2 },
      })
        .sort({ price: -1 })
        .limit(100);
      res.json(upgradeSkins);
      break;

    default:
      break;
  }
}
export default connectDB(handler);
