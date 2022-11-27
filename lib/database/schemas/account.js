import mongoose, { Schema, model, models } from "mongoose";

const accountSchema = new Schema({
  provider: String,
  type: String,
  providerAccountId: String,
  access_token: String,
  expires_at: Number,
  scope: String,
  token_type: String,
  id_token: String,
  userId: mongoose.Types.ObjectId,
});

const Account = models.Account || model("Account", accountSchema);
export default Account;
