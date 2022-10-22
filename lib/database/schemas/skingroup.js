import { Schema, model, models } from "mongoose";

const skingroupSchema = new Schema({
  name: {
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
  rarity: {
    type: String,
  },
  rarityColor: {
    type: String,
  },
  skinIds: [],
});

const Skingroup = models.Skingroup || model("Skingroup", skingroupSchema);
export default Skingroup;
