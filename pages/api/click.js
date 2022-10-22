import connectDB from "../../lib/database/connectMongoDb";
import UserStat from "../../lib/database/schemas/userStat";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { getToken } from "next-auth/jwt";

const opts = {
  points: 20,
  duration: 1,
};
const rateLimiter = new RateLimiterMemory(opts);

async function handler(req, res) {
  try {
    await rateLimiter.consume(req.connection.remoteAddress);
  } catch (ex) {
    return res.status(429).json({ error: "Rate limit exeeded" });
  }

  const token = await getToken({ req });
  const userId = token.id;

  const userStat = await UserStat.findOne({ userId: userId });
  const updatedUserStat = await UserStat.findOneAndUpdate(
    { userId: userId },
    { money: userStat.money + userStat.moneyPerClick }
  );
  res.json(updatedUserStat);
}
export default connectDB(handler);
