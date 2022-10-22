import connectDB from "../../lib/database/connectMongoDb";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import UserStat from "../../lib/database/schemas/userStat";
import { getToken } from "next-auth/jwt";

async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  const { id } = token;
  const userStat = await UserStat.findOne({ userId: id });
  res.json({ money: userStat.money, moneyPerClick: userStat.moneyPerClick });
}
export default connectDB(handler);
