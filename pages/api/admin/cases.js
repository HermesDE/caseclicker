import connectDB from "../../../lib/database/connectMongoDb";
import Case from "../../../lib/database/schemas/case";

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      console.log(req.body);
      const newCase = new Case({
        name: req.body.name,
        iconUrl: req.body.iconUrl,
        price: req.body.price,
        skingroups: req.body.skingroups,
      });
      const savedCase = await newCase.save();
      res.json(savedCase);
      break;

    default:
      break;
  }
};
export default connectDB(handler);
