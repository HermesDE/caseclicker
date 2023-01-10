import { Schema, model, models } from "mongoose";

const userStatSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    money: {
      type: Number,
      default: 100,
    },
    moneyEarned: {
      type: Number,
      default: 0,
    },
    moneySpent: {
      type: Number,
      default: 0,
    },
    moneyPerClick: {
      type: Number,
      default: 0.1,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    openedCases: {
      type: Number,
      default: 0,
    },
    upgrades: {
      type: Number,
      default: 0,
    },
    upgradesWon: {
      type: Number,
      default: 0,
    },
    coinflips: {
      type: Number,
      default: 0,
    },
    coinflipsWon: {
      type: Number,
      default: 0,
    },
    tokens: {
      type: Number,
      default: 0,
    },
    tokensWon: {
      type: Number,
      default: 0,
    },
    tokensLost: {
      type: Number,
      default: 0,
    },
    xp: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const UserStat = models.UserStat || model("UserStat", userStatSchema);
export default UserStat;
