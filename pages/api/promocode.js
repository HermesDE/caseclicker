import dbConnect from "../../lib/database/connectMongoDb";
import PromoCode from "../../lib/database/schemas/promoCode";
import UserStat from "../../lib/database/schemas/userStat";
import Skin from "../../lib/database/schemas/skin";
import OpenedSkin from "../../lib/database/schemas/openedSkin";
import { getToken } from "next-auth/jwt";
import generateFloat from "../../lib/float";

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
  if (promoCode.redeemedBy.includes(token.email)) {
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

    //2 means give player random knifes
    case "2":
      const randomKnifes = [];
      const knifes = await Skin.find({ weaponType: "Knife" });

      for (let i = 0; i < rewardArray[1]; i++) {
        randomKnifes.push(knifes[Math.floor(Math.random() * knifes.length)]);
      }

      for (const knife of randomKnifes) {
        const newKnife = new OpenedSkin({
          name: knife.name,
          classId: knife.classId,
          iconUrl: knife.iconUrl,
          type: knife.type,
          weaponType: knife.weaponType,
          knifeType: knife.knifeType,
          exterior: knife.exterior,
          rarity: knife.rarity,
          rarityColor: knife.rarityColor,
          price: knife.price,
          statTrak: knife.statTrak,
          float: generateFloat(knife.exterior),
          userId: token.id,
          openedAt: new Date(),
        });
        await newKnife.save();
      }

      break;
    default:
      break;
  }
  promoCode.redeemedBy.push(token.email);
  await promoCode.save();

  res.json({ message: "ok" });
}
export default dbConnect(handler);
