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
  redeemedBy: [{ type: String }],
});

const PromoCode = models.PromoCode || model("PromoCode", promoCodeSchema);
export default PromoCode;
export { promoCodeSchema };
