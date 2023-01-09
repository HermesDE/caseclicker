import connectDB from "../../../lib/database/connectMongoDb";
import { getToken } from "next-auth/jwt";
import MarketplaceSkin from "../../../lib/database/schemas/marketplaceSkin";
import OpenedSkin from "../../../lib/database/schemas/openedSkin";
import Notification from "../../../lib/database/schemas/notification";
import UserStat from "../../../lib/database/schemas/userStat";

async function handler(req, res) {
  const token = await getToken({ req });
  const { id } = req.body;

  const marketplaceSkin = await MarketplaceSkin.findById(id);
  if (!marketplaceSkin) {
    return res
      .status(404)
      .json({ error: "No skin offer found with the given id." });
  }
  if (marketplaceSkin.userId === token.id) {
    return res.json(403).json({
      error: "That is already your skin. Go to your offers and delete it.",
    });
  }
  //check if the user has enough money
  const buyerUserStat = await UserStat.findOne({ userId: token.id });
  if (buyerUserStat.money < marketplaceSkin.price) {
    return res.json(400).json({ error: "You dont have enough money" });
  }
  //delete skin from marketplace and create the skin in the buyers inventory
  await MarketplaceSkin.findByIdAndDelete(id);
  const openedSkin = new OpenedSkin({
    name: marketplaceSkin.openedSkin.name,
    classId: marketplaceSkin.openedSkin.classId,
    iconUrl: marketplaceSkin.openedSkin.iconUrl,
    type: marketplaceSkin.openedSkin.type,
    weaponType: marketplaceSkin.openedSkin.weaponType,
    gunType: marketplaceSkin.openedSkin.gunType,
    knifeType: marketplaceSkin.openedSkin.knifeType,
    exterior: marketplaceSkin.openedSkin.exterior,
    rarity: marketplaceSkin.openedSkin.rarity,
    rarityColor: marketplaceSkin.openedSkin.rarityColor,
    price: marketplaceSkin.openedSkin.price,
    statTrak: marketplaceSkin.openedSkin.statTrak,
    souvenir: marketplaceSkin.openedSkin.souvenir,
    float: marketplaceSkin.openedSkin.float,
    userId: token.id,
    openedAt: marketplaceSkin.openedSkin.openedAt,
  });
  await openedSkin.save();

  //subtract money from buyer and add it to seller
  buyerUserStat.money -= marketplaceSkin.price;
  buyerUserStat.moneySpent += marketplaceSkin.price;
  await buyerUserStat.save();
  await UserStat.findOneAndUpdate(
    { userId: marketplaceSkin.userId },
    {
      $inc: {
        money: marketplaceSkin.price,
        moneyEarned: marketplaceSkin.price,
      },
    }
  );

  //create notification to inform the seller about the sold item
  const newNotification = new Notification({
    userId: marketplaceSkin.userId,
    title: "Your skin was sold",
    message: `Your ${marketplaceSkin.openedSkin.name} was sold for ${marketplaceSkin.price}$`,
    createdAt: new Date(),
  });
  await newNotification.save();
  return res.json({ message: "ok" });
}
export default connectDB(handler);
