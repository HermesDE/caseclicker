import { getToken } from "next-auth/jwt";
import connectDB from "../../lib/database/connectMongoDb";
import MarketplaceSkin from "../../lib/database/schemas/marketplaceSkin";
import OpenedSkin from "../../lib/database/schemas/openedSkin";

async function handler(req, res) {
  const token = await getToken({ req });
  switch (req.method) {
    case "GET":
      const { userOffers, tag } = req.query;
      if (userOffers === "true") {
        const offers = await MarketplaceSkin.find({ userId: token.id });
        return res.json(offers);
      }
      if (tag === "latest") {
        const offers = await MarketplaceSkin.find({ userId: { $ne: token.id } })
          .sort({ offeredAt: -1 })
          .limit(20);
        return res.json(offers);
      }
      if (tag === "price") {
        const offers = await MarketplaceSkin.find({ userId: { $ne: token.id } })
          .sort({ price: 1 })
          .limit(20);
        return res.json(offers);
      }
      break;
    case "POST":
      const { skinId, price } = req.body;
      if (!skinId || !price || Number.isNaN(price)) {
        return res
          .status(400)
          .json({ error: "Please provide a correct price and skin id" });
      }
      const inventorySkin = await OpenedSkin.findById(skinId);
      if (!inventorySkin) {
        return res
          .status(400)
          .json({ error: "Please provide a correct skin id" });
      }
      if (inventorySkin.userId !== token.id) {
        return res.status(403).json({ error: "That is not your skin buddy" });
      }
      if (
        inventorySkin.rarity !== "Classified" &&
        inventorySkin.rarity !== "Covert"
      ) {
        return res.status(400).json({
          error: "Only classified or covert skins can be placed on the market",
        });
      }

      //now delete the skin from the user inventory and create a new marketplaceskin
      await OpenedSkin.findOneAndDelete({ _id: skinId });
      const newMarketplaceSkin = await MarketplaceSkin({
        openedSkin: inventorySkin,
        userId: token.id,
        price: price,
        offeredAt: new Date(),
      });
      await newMarketplaceSkin.save();
      res.json({ message: "ok" });
      break;
    case "DELETE":
      const { id } = req.body;

      const marketplaceSkin = await MarketplaceSkin.findById(id);
      if (marketplaceSkin.userId !== token.id) {
        return res.json(403).json({ error: "Thats not your skin buddy" });
      }
      //delete skin from marketplace and create the skin in the user inventory
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
        userId: marketplaceSkin.openedSkin.userId,
        openedAt: marketplaceSkin.openedSkin.openedAt,
      });
      await openedSkin.save();
      return res.json({ message: "ok" });
      break;
    default:
      break;
  }
}
export default connectDB(handler);
