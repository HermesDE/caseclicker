import dbConnect from "../../../lib/database/connectMongoDb";
import Profile from "../../../lib/database/schemas/profile";
import { getToken } from "next-auth/jwt";

async function handler(req, res) {
  const token = await getToken({ req });

  switch (req.method) {
    case "GET":
      const profile = await Profile.findOne({ userId: token.id });
      res.json(profile);
      break;
    case "POST":
      const { privateProfile, description } = req.body;
      await Profile.findOneAndUpdate(
        { userId: token.id },
        { private: privateProfile, description: description.split("\n") }
      );
      res.json({ message: "ok" });
    default:
      break;
  }
}
export default dbConnect(handler);
