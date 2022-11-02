import connectDB from "../../lib/database/connectMongoDb";
import OpenedSkin from "../../lib/database/schemas/openedSkin";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import UserStat from "../../lib/database/schemas/userStat";
import { getToken } from "next-auth/jwt";

async function handler(req, res) {
  const token = await getToken({ req });
  const userId = token.id;

  switch (req.method) {
    case "GET": {
      const { sort, exterior, rarity, value, price } = req.query;
      let skins = await OpenedSkin.find({ userId: userId });

      if (value) {
        const value = await OpenedSkin.aggregate([
          { $match: { userId: userId } },
          { $group: { _id: null, value: { $sum: "$price" } } },
        ]);
        return res.json({ inventoryValue: value[0].value });
      }
      if (exterior !== "null" && exterior) {
        skins = skins.filter((skin) => skin.exterior === exterior);
      }
      if (rarity !== "null" && rarity) {
        skins = skins.filter((skin) => skin.rarity === rarity);
      }
      if (!isNaN(parseInt(price))) {
        skins = await OpenedSkin.find({
          userId: userId,
          price: { $lte: price },
        });
      }

      if (sort === "true") {
        skins.sort((a, b) => {
          return new Date(b.openedAt) - new Date(a.openedAt);
        });
      }
      if (sort === "price") {
        skins.sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (skins.length > 50) {
        skins.length = 50;
      }

      res.json(skins);
      break;
    }

    case "PATCH": {
      const { type, value } = req.body;
      if (type === "rarity") {
        const raritySkins = await OpenedSkin.find({
          userId: userId,
          rarity: value,
        });
        let costs = raritySkins.map((skin) => skin.price);
        let cost = costs.reduce((a, b) => a + b, 0);
        return res.json({
          cost: Math.round(cost * 100) / 100,
          count: raritySkins.length,
        });
      }
      break;
    }

    case "DELETE": {
      const { type, value, id } = req.body;

      if (type === "rarity") {
        const raritySkins = await OpenedSkin.find({
          userId: userId,
          rarity: value,
        });
        let costs = raritySkins.map((skin) => skin.price);
        let cost = costs.reduce((a, b) => a + b, 0);

        await OpenedSkin.deleteMany({
          userId: userId,
          rarity: value,
        });
        await UserStat.findOneAndUpdate(
          { userId: userId },
          { $inc: { money: cost } }
        );
        return res.json({ message: "ok" });
      }

      const deletedOpenedSkin = await OpenedSkin.findOneAndDelete({ _id: id });
      await UserStat.findOneAndUpdate(
        { userId: userId },
        { $inc: { money: deletedOpenedSkin.price } }
      );
      res.json({ message: "ok" });
      break;
    }

    default:
      break;
  }
}
export default connectDB(handler);
