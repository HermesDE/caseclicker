import connectDB from "../../../lib/database/connectMongoDb";
import { getToken } from "next-auth/jwt";

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
      if (chance > 91) {
        return res
          .status(400)
          .json({ error: "skin price difference is too small" });
      }
      if (chance < 50) {
        return res
          .status(400)
          .json({ error: "skin price difference is too large" });
      }

      const random = Math.random() * 101;
      const result = random <= chance;
      res.json({ result: result, random: random });
      break;

    default:
      break;
  }
}
export default connectDB(handler);
