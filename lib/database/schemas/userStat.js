import { Schema, model, models } from "mongoose";

const userStatSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  money: {
    type: Number,
    default: 10,
  },
  moneyPerClick: {
    type: Number,
    default: 0.1,
  },
});

const UserStat = models.UserStat || model("UserStat", userStatSchema);
export default UserStat;
