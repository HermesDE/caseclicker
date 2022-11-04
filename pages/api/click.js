import connectDB from "../../lib/database/connectMongoDb";
import UserStat from "../../lib/database/schemas/userStat";
import { getToken } from "next-auth/jwt";

async function handler(req, res) {
  const token = await getToken({ req });
  const userId = token.id;

  const userStat = await UserStat.findOne({ userId: userId });
  const updatedUserStat = await UserStat.findOneAndUpdate(
    { userId: userId },
    { $inc: { money: userStat.moneyPerClick } }
  );
  res.json(updatedUserStat);
}
export default connectDB(handler);
