import { Schema, model, models } from "mongoose";

const caseSchema = new Schema({
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
  },
  specialItem: {
    type: String,
  },
  link: {
    type: String,
  },
  neededOpenedCases: {
    type: Number,
  },
  skingroups: [],
});

const Case = models.Case || model("Case", caseSchema);
export default Case;
