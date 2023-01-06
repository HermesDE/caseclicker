import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    emailVerified: Boolean,
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
