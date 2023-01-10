import dbConnect from "../../../lib/database/connectMongoDb";
import { getToken } from "next-auth/jwt";
import User from "../../../lib/database/schemas/user";
import MarketplaceSkin from "../../../lib/database/schemas/marketplaceSkin";
import OpenedSkin from "../../../lib/database/schemas/openedSkin";
import UserStat from "../../../lib/database/schemas/userStat";
import Account from "../../../lib/database/schemas/account";
import Notification from "../../../lib/database/schemas/notification";
import Profile from "../../../lib/database/schemas/profile";

async function handler(req, res) {
  const token = await getToken({ req });
  const id = token.id;

  switch (req.method) {
    case "POST":
      const { username } = req.body;

      const usernameRegex = /^[a-zA-Z0-9_. ]*$/;
      if (!(usernameRegex.test(username) && username.split("").length < 20)) {
        return res.status(400).json({ error: "invalid username" });
      }
      await User.findByIdAndUpdate(id, { name: username });
      res.json({ message: "ok" });
      break;
    case "DELETE":
      await MarketplaceSkin.deleteMany({ userId: id });
      await Notification.deleteMany({ userId: id });
      await OpenedSkin.deleteMany({ userId: id });
      await UserStat.deleteOne({ userId: id });
      await Profile.deleteOne({ userId: id });
      await Account.findOneAndDelete({ userId: id });
      await User.findByIdAndDelete(id);

      res.json({ message: "ok" });
      break;

    default:
      break;
  }
}
export default dbConnect(handler);
