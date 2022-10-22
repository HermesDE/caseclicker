import { Schema, model, models } from "mongoose";

const skinSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  classId: {
    type: String,
    required: true,
    unique: true,
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
});

const Skin = models.Skin || model("Skin", skinSchema);
export default Skin;
