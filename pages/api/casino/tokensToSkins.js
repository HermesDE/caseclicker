import connectDB from "../../../lib/database/connectMongoDb";
import { getToken } from "next-auth/jwt";
import UserStat from "../../../lib/database/schemas/userStat";
import OpenedSkin from "../../../lib/database/schemas/openedSkin";
import convertTokensToSkins from "../../../lib/convertTokensToSkins";

async function handler(req, res) {
  const token = await getToken({ req });
  const { tokens } = req.body;
  if (isNaN(tokens) || tokens < 1) {
    return res.status(400).json({ error: "Tokens are not valid" });
  }

  switch (req.method) {
    case "POST":
      const userStats = await UserStat.findOne({ userId: token.id });
      if (userStats.tokens < tokens)
        return res.status(400).json({ error: "You dont have enough tokens" });

      const skins = await convertTokensToSkins(tokens, token.id);

      userStats.tokens -= tokens;
      await userStats.save();

      res.json({ skins });
      break;

    default:
      break;
  }
}
export default connectDB(handler);
