import connectDB from "../../lib/database/connectMongoDb";
import OpenedSkin from "../../lib/database/schemas/openedSkin";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import UserStat from "../../lib/database/schemas/userStat";

async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { userId } = session;

  switch (req.method) {
    case "GET":
      const { sort } = req.query;
      const skins = await OpenedSkin.find({ userId: userId });

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
      skins.length = 50;
      res.json(skins);
      break;
    case "DELETE":
      const { id } = req.body;
      const deletedOpenedSkin = await OpenedSkin.findOneAndDelete({ _id: id });
      await UserStat.findOneAndUpdate(
        { userId: userId },
        { $inc: { money: deletedOpenedSkin.price } }
      );
      res.json({ message: "ok" });
      break;
    default:
      break;
  }
}
export default connectDB(handler);
