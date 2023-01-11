import { Schema, model, models } from "mongoose";

const profileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  private: {
    type: Boolean,
    default: false,
  },
  description: [String],
  quote: {
    type: String,
    default: "",
  },
});

const Profile = models.Profile || model("Profile", profileSchema);
export default Profile;
