import { Schema, model, models } from "mongoose";

const customCaseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  iconUrl: {
    type: String,
  },
  rarity: {
    type: String,
    default: "Base Grade",
  },
  rarityColor: {
    type: String,
    default: "b0c3d9",
  },
  price: {
    type: Number,
    required: true,
  },
  rankNeeded: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: false,
  },
  skingroups: [],
  moneySpend: {
    type: Number,
    default: 0,
  },
  moneyEarned: {
    type: Number,
    default: 0,
  },
  openedCount: {
    type: Number,
    default: 0,
  },
});

const CustomCase = models.CustomCase || model("CustomCase", customCaseSchema);
export default CustomCase;
