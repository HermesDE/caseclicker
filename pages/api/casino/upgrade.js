import connectDB from "../../../lib/database/connectMongoDb";
import { getToken } from "next-auth/jwt";
import OpenedSkin from "../../../lib/database/schemas/openedSkin";
import generateFloat from "../../../lib/float";

async function handler(req, res) {
  const token = await getToken({ req });
  const { userSkin, upgradeSkin } = req.body;

  switch (req.method) {
    case "POST":
      if (!userSkin || !upgradeSkin) {
        return res
          .status(400)
          .json({ error: "userskin or upgrade skin is missing" });
      }

      const chance = (userSkin.price / upgradeSkin.price) * 100;
      if (chance > 90) {
        return res
          .status(400)
          .json({ error: "skin price difference is too small" });
      }
      /* if (chance < 50) {
        return res
          .status(400)
          .json({ error: "skin price difference is too large" });
      } */

      const random = Math.random() * 101;
      const result = random <= chance;

      await OpenedSkin.findOneAndDelete({ _id: userSkin._id });
      if (result) {
        const float = generateFloat(upgradeSkin.exterior);
        upgradeSkin.float = float;
        upgradeSkin.userId = token.id;
        upgradeSkin.openedAt = new Date();
        const wonSkin = new OpenedSkin(upgradeSkin);
        await wonSkin.save();
      }

      res.json({ result: result, random: random });
      break;

    default:
      break;
  }
}
export default connectDB(handler);
