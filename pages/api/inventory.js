import connectDB from "../../lib/database/connectMongoDb";
import OpenedSkin from "../../lib/database/schemas/openedSkin";
import UserStat from "../../lib/database/schemas/userStat";
import { getToken } from "next-auth/jwt";

async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ error: "unautorized" });
  }
  const userId = token.id;

  switch (req.method) {
    case "GET": {
      const { sort, exterior, rarity, value, page, search } = req.query;

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
        if (rarity === "Covert") {
          query.rarity = ["Covert", "Extraordinary"];
        } else {
          query.rarity = rarity;
        }
      }
      if (search !== null && search) {
        query.name = { $regex: search, $options: "i" };
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
      const { type, value, currency } = req.body;
      if (type === "rarity") {
        const raritySkins = await OpenedSkin.find({
          userId: userId,
          rarity: value,
        });
        let costs = raritySkins.map((skin) => skin.price);
        let cost = costs.reduce((a, b) => a + b, 0);
        return res.json({
          cost:
            currency === "money"
              ? Math.round(cost * 100) / 100
              : Math.round(cost * 10 * 100) / 100,
          count: raritySkins.length,
        });
      } else if (type === "price") {
        const skins = await OpenedSkin.find({
          userId: userId,
          price: { $lt: value },
        });
        let costs = skins.map((skin) => skin.price);
        let cost = costs.reduce((a, b) => a + b, 0);
        return res.json({
          cost:
            currency === "money"
              ? Math.round(cost * 100) / 100
              : Math.round(cost * 10 * 100) / 100,
          count: skins.length,
        });
      }
      break;
    }

    case "DELETE": {
      const { type, value, id, currency } = req.body;

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
        if (currency === "money") {
          await UserStat.findOneAndUpdate(
            { userId: userId },
            { $inc: { money: cost, moneyEarned: cost } }
          );
        } else if (currency === "tokens") {
          await UserStat.findOneAndUpdate(
            { userId: userId },
            { $inc: { tokens: cost * 10 } }
          );
        }
        return res.json({ message: "ok" });
      } else if (type === "price") {
        const skins = await OpenedSkin.find({
          userId: userId,
          price: { $lt: value },
        });
        let costs = skins.map((skin) => skin.price);
        let cost = costs.reduce((a, b) => a + b, 0);

        await OpenedSkin.deleteMany({
          userId: userId,
          price: { $lt: value },
        });
        if (currency === "money") {
          await UserStat.findOneAndUpdate(
            { userId: userId },
            { $inc: { money: cost, moneyEarned: cost } }
          );
        } else if (currency === "tokens") {
          await UserStat.findOneAndUpdate(
            { userId: userId },
            { $inc: { tokens: cost * 10 } }
          );
        }
        return res.json({ message: "ok" });
      }

      const deletedOpenedSkin = await OpenedSkin.findOneAndDelete({ _id: id });
      await UserStat.findOneAndUpdate(
        { userId: userId },
        {
          $inc: {
            money: deletedOpenedSkin.price,
            moneyEarned: deletedOpenedSkin.price,
          },
        }
      );
      res.json({ message: "ok" });
      break;
    }

    default:
      break;
  }
}
export default connectDB(handler);
