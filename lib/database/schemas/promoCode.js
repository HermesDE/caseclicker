import { Schema, model, models } from "mongoose";

const promoCodeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  validTill: {
    type: Date,
  },
  reward: {
    type: String,
    required: true,
  },
  redeemedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const PromoCode = models.PromoCode || model("PromoCode", promoCodeSchema);
export default PromoCode;
export { promoCodeSchema };
