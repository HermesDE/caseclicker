import { Schema, model, models } from "mongoose";
import { openedSkinSchema } from "./openedSkin";

const MarketplaceSkinSchema = new Schema({
  openedSkin: {
    type: openedSkinSchema,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offeredAt: {
    type: Date,
    required: true,
  },
});

const MarketplaceSkin =
  models.MarketplaceSkin || model("MarketplaceSkin", MarketplaceSkinSchema);
export default MarketplaceSkin;
