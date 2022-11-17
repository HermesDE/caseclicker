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
  neededOpenedCases: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: false,
  },
  skingroups: [],
});

const CustomCase = models.CustomCase || model("CustomCase", customCaseSchema);
export default CustomCase;
