import dbConnect from "../../lib/database/connectMongoDb";
import PromoCode from "../../lib/database/schemas/promoCode";
import UserStat from "../../lib/database/schemas/userStat";
import { getToken } from "next-auth/jwt";

async function handler(req, res) {
  const token = await getToken({ req });
  const { code } = req.body;
  if (!code)
    return res.status(400).json({ error: "Please provide a promo code." });

  const promoCode = await PromoCode.findOne({ name: code });
  if (!promoCode) {
    return res.status(400).json({ error: "invalid promo code" });
  }
  if (promoCode.validTill < new Date()) {
    return res.status(400).json({ error: "promo code expired" });
  }
  if (!promoCode.active) {
    return res.status(400).json({ error: "promo code is not active" });
  }
  if (promoCode.redeemedBy.includes(token.id)) {
    return res
      .status(400)
      .json({ error: "You already redeemed this promo code" });
  }

  const { reward } = promoCode;
  const rewardArray = reward.split(";");

  switch (rewardArray[0]) {
    //1 means give player money
    case "1":
      await UserStat.findOneAndUpdate(
        { userId: token.id },
        { $inc: { money: rewardArray[1] } }
      );
      break;

    default:
      break;
  }
  promoCode.redeemedBy.push(token.id);
  await promoCode.save();

  res.json({ message: "ok" });
}
export default dbConnect(handler);
