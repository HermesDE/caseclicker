import { Schema, model, models } from "mongoose";

const openedSkinSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  classId: {
    type: String,
    required: true,
  },
  iconUrl: {
    type: String,
  },
  type: {
    type: String,
  },
  weaponType: {
    type: String,
  },
  gunType: {
    type: String,
  },
  knifeType: {
    type: String,
  },
  exterior: {
    type: String,
  },
  rarity: {
    type: String,
  },
  rarityColor: {
    type: String,
  },
  price: {
    type: Number,
  },
  statTrak: {
    type: Boolean,
  },
  souvenir: {
    type: Boolean,
  },
  float: {
    type: Number,
  },
  userId: {
    type: String,
  },
  openedAt: {
    type: Date,
  },
});

const OpenedSkin = models.OpenedSkin || model("OpenedSkin", openedSkinSchema);
export default OpenedSkin;
export { openedSkinSchema };
