import connectDB from "../../../lib/database/connectMongoDb";
import UserStat from "../../../lib/database/schemas/userStat";
import CoinflipGame from "../../../lib/database/schemas/coinflipGame";
import { getToken } from "next-auth/jwt";

async function handler(req, res) {
  const token = await getToken({ req });
  switch (req.method) {
    case "GET": {
      if (req.query.id) {
        const coinflipGame = await CoinflipGame.findById(req.query.id);
        return res.json(coinflipGame);
      }
      const coinflipGames = await CoinflipGame.find({});
      res.json(coinflipGames);
      break;
    }

    //create game
    case "POST": {
      const { bet } = req.body;
      const userStat = await UserStat.findOne({ userId: token.id });
      if (userStat.tokens < bet) {
        return res.status(400).json({ error: "You dont have enough tokens" });
      }
      await UserStat.findOneAndUpdate(
        { userId: token.id },
        { $inc: { tokens: -bet } }
      );
      const newCoinflipGame = new CoinflipGame({
        bet: bet,
        host: token,
        createdAt: new Date(),
      });
      await newCoinflipGame.save();
      res.json({ gameId: newCoinflipGame._id });
      break;
    }

    //join game
    case "PATCH": {
      const { id } = req.body;
      const coinflipGame = await CoinflipGame.findById(id);
      if (!coinflipGame) {
        return res
          .status(404)
          .json({ error: "No game found with the given id" });
      }
      if (coinflipGame.status === "closed") {
        return res.status(403).json({ error: "Game is full or expired" });
      }
      const userStat = await UserStat.findOne({ userId: token.id });
      if (userStat.tokens < coinflipGame.bet) {
        return res.status(400).json({ error: "You dont have enough money" });
      }
      userStat.tokens -= coinflipGame.bet;
      await userStat.save();
      coinflipGame.guest = token;
      await coinflipGame.save();

      res.json({ message: "ok" });

      //start game logic
      const randomBoolean = Math.random() < 0.5;
      const winner = randomBoolean ? "host" : "guest";
      coinflipGame.winner = winner;
      coinflipGame.status = "closed";
      coinflipGame.save();

      //reward winning player
      await UserStat.findOneAndUpdate(
        {
          userId:
            winner === "host" ? coinflipGame.host.id : coinflipGame.guest.id,
        },
        { $inc: { tokens: +coinflipGame.bet * 2 } }
      );

      break;
    }

    default:
      break;
  }
}

export default connectDB(handler);
