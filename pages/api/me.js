import connectDB from "../../lib/database/connectMongoDb";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import UserStat from "../../lib/database/schemas/userStat";

async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });
  const { userId } = session;
  const userStat = await UserStat.findOne({ userId: userId });
  res.json({ money: userStat.money, moneyPerClick: userStat.moneyPerClick });
}
export default connectDB(handler);
