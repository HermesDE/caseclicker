import connectDB from "../../lib/database/connectMongoDb";
import Notification from "../../lib/database/schemas/notification";
import { getToken } from "next-auth/jwt";

async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ error: "unauthorized" });
  }
  switch (req.method) {
    case "GET":
      const notifications = await Notification.find({ userId: token.id }).sort({
        createdAt: -1,
      });
      res.json(notifications);
      break;
    case "DELETE":
      await Notification.findOneAndDelete({
        userId: token.id,
        id: req.body.id,
      });
      res.json({ message: "ok" });
      break;

    default:
      break;
  }
}
export default connectDB(handler);
