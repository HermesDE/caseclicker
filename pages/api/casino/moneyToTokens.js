import connectDB from "../../../lib/database/connectMongoDb";
import { getToken } from "next-auth/jwt";
import UserStat from "../../../lib/database/schemas/userStat";

async function handler(req, res) {
  const token = await getToken({ req });
  const { tokens } = req.body;

  switch (req.method) {
    case "POST":
      const userStat = await UserStat.findOne({ userId: token.id });
      if (Number.isNaN(tokens)) {
        return res.status(400).json({ error: "Please provide a number" });
      }
      if (tokens > userStat.money / 10) {
        return res.status(400).json({ error: "You dont have enough money" });
      }
      await UserStat.findOneAndUpdate(
        { userId: token.id },
        { $inc: { money: -tokens * 10, tokens: +tokens } }
      );
      res.json({ message: "ok" });
      break;

    default:
      break;
  }
}
export default connectDB(handler);
