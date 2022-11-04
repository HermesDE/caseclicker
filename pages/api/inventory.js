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
      const { sort, exterior, rarity, value, page } = req.query;

      if (value) {
        const value = await OpenedSkin.aggregate([
          { $match: { userId: userId } },
          { $group: { _id: null, value: { $sum: "$price" } } },
        ]);
        return res.json({ inventoryValue: value[0].value });
      }

      const query = {
        userId: userId,
      };
      if (exterior !== null && exterior) {
        query.exterior = exterior;
      }
      if (rarity !== null && rarity) {
        query.rarity = rarity;
      }

      const skins = await OpenedSkin.find(query)
        .sort(
          sort === "true"
            ? { openedAt: -1 }
            : sort === "false"
            ? { openedAt: 1 }
            : sort === "price"
            ? { price: -1 }
            : {}
        )

        .limit(50)
        .skip((page - 1) * 50);
      const filterCount = await OpenedSkin.countDocuments(query);
      const count = await OpenedSkin.countDocuments({ userId: userId });

      res.json({ skins, pages: Math.ceil(filterCount / 50), count: count });
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
