import connectDB from "../../../lib/database/connectMongoDb";
import CustomCase from "../../../lib/database/schemas/customCase";

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      const newCustomCase = new CustomCase({
        name: req.body.name,
        iconUrl: req.body.iconUrl,
        price: req.body.price,
        skingroups: req.body.skingroups,
        specialItem: req.body.specialItem,
        neededOpenedCases: req.body.neededOpenedCases,
      });
      const savedCase = await newCustomCase.save();
      res.json(savedCase);
      break;

    default:
      break;
  }
};
export default connectDB(handler);
