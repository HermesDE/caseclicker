import connectDB from "../../../../lib/database/connectMongoDb";
import { getToken } from "next-auth/jwt";
import OpenedSkin from "../../../../lib/database/schemas/openedSkin";
import Skin from "../../../../lib/database/schemas/skin";

async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ error: "unauthorized" });
  }
  const { id, price, skinName } = req.body;
  const sortPrice = req.query.price;
  const name = req.query.name;

  const query = {
    userId: token.id,
    price: { $lte: sortPrice },
  };
  if (name !== null && name) {
    query.name = { $regex: name, $options: "i" };
  }
  switch (req.method) {
    case "GET":
      let skins;
      if (!Number.isNaN(parseInt(sortPrice))) {
        skins = await OpenedSkin.find(query).sort({ price: -1 }).limit(50);
      } else {
        skins = await OpenedSkin.find({ userId: token.id })
          .sort({ price: -1 })
          .limit(50);
      }
      res.json(skins);
      break;
    case "POST":
      const userSkin = await OpenedSkin.findById(id);
      if (!userSkin) {
        return res
          .status(404)
          .json({ error: "No skin found with the given id" });
      }
      const query = {
        price: {
          $gte: userSkin.price * 1.1,
          $lte: price || userSkin.price * 2,
        },
      };
      if (skinName !== null && skinName) {
        query.name = { $regex: skinName, $options: "i" };
      }
      const upgradeSkins = await Skin.find(query)
        .sort({ price: -1 })
        .limit(100);
      res.json(upgradeSkins);
      break;

    default:
      break;
  }
}
export default connectDB(handler);
