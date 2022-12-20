import connectDB from "../../../lib/database/connectMongoDb";
import { getToken } from "next-auth/jwt";
import UserStat from "../../../lib/database/schemas/userStat";
import OpenedSkin from "../../../lib/database/schemas/openedSkin";

async function handler(req, res) {
  const token = await getToken({ req });
  const { id } = req.body;

  switch (req.method) {
    case "POST":
      const skin = await OpenedSkin.findOneAndDelete({
        _id: id,
        userId: token.id,
      });
      if (!skin)
        return res
          .status(404)
          .json({ error: "no skin found with the given id" });
      await UserStat.findOneAndUpdate(
        { userId: token.id },
        { $inc: { tokens: skin.price * 10 } }
      );
      res.json({ message: "ok" });

      break;

    default:
      break;
  }
}
export default connectDB(handler);
