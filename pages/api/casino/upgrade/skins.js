import connectDB from "../../../../lib/database/connectMongoDb";
import { getToken } from "next-auth/jwt";
import OpenedSkin from "../../../../lib/database/schemas/openedSkin";
import Skin from "../../../../lib/database/schemas/skin";

async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ error: "unauthorized" });
  }

  switch (req.method) {
    case "GET": {
      let skins;
      const { price, name } = req.query;

      const query = {
        userId: token.id,
      };
      if (price !== null && price !== "" && !Number.isNaN(price)) {
        query.price = { $lte: price };
      }
      if (name !== null && name) {
        query.name = { $regex: name, $options: "i" };
      }

      skins = await OpenedSkin.find(query).sort({ price: -1 }).limit(50);

      res.json(skins);
      break;
    }

    case "POST":
      const { id, price, name } = req.body;
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
      if (name !== null && name) {
        query.name = { $regex: name, $options: "i" };
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
