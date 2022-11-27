import connectDB from "../../../lib/database/connectMongoDb";
import clientPromise from "../../../lib/database/mongodb";
import Account from "../../../lib/database/schemas/account";
import MarketplaceSkin from "../../../lib/database/schemas/marketplaceSkin";
import Notification from "../../../lib/database/schemas/notification";
import OpenedSkin from "../../../lib/database/schemas/openedSkin";
import User from "../../../lib/database/schemas/user";
import UserStat from "../../../lib/database/schemas/userStat";

async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("caseclicker");
  switch (req.method) {
    case "GET":
      const users = await db.collection("users").find({}).toArray();
      res.json(users);
      break;
    case "DELETE":
      const { id } = req.body;
      await MarketplaceSkin.deleteMany({ userId: id });
      await Notification.deleteMany({ userId: id });
      await OpenedSkin.deleteMany({ userId: id });
      await UserStat.deleteOne({ userId: id });
      await Account.findOneAndDelete({ userId: id });
      await User.findByIdAndDelete(id);

      /* await db
        .collection("accounts")
        .deleteOne({ userId: `new ObjectId('${id}')` });
      await db.collection("users").deleteOne({ _id: `new ObjectId('${id}')` }); */
      res.json({ message: "ok" });
      break;
    default:
      break;
  }
}
export default connectDB(handler);
