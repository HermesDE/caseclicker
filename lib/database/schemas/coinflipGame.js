import { Schema, model, models } from "mongoose";

const coinflipGameSchema = new Schema({
  status: {
    type: String,
    default: "open",
  },
  bet: {
    type: Number,
    required: true,
  },
  host: {
    type: Object,
    required: true,
  },
  guest: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    required: true,
  },
  winner: {
    type: String,
  },
});

const CoinflipGame =
  models.CoinflipGame || model("CoinflipGame", coinflipGameSchema);
export default CoinflipGame;
