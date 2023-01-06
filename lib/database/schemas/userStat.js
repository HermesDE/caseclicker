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
    moneyPerClick: {
      type: Number,
      default: 0.1,
    },
    openedCases: {
      type: Number,
      default: 0,
    },
    tokens: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const UserStat = models.UserStat || model("UserStat", userStatSchema);
export default UserStat;
