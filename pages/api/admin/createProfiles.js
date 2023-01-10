import dbConnect from "../../../lib/database/connectMongoDb";
import User from "../../../lib/database/schemas/user";
import Profile from "../../../lib/database/schemas/profile";

async function handler(req, res) {
  /* const users = await User.find({});
  for (const user of users) {
    const newProfile = new Profile({ userId: user._id });
    await newProfile.save();
  } */
  res.json({ message: "ok" });
}
export default dbConnect(handler);
