import connectDB from "../../../lib/database/connectMongoDb";
import CustomCase from "../../../lib/database/schemas/customCase";

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      const { skingroups, percentage } = req.body;
      console.log(skingroups, percentage);

      let objectSkingroups = [];
      for (let i = 0; i < skingroups.length; i++) {
        objectSkingroups.push({
          skingroup: skingroups[i],
          percentage: parseInt(percentage[i]),
        });
      }

      const newCustomCase = new CustomCase({
        name: req.body.name,
        iconUrl: req.body.iconUrl,
        price: req.body.price,
        skingroups: objectSkingroups,
        specialItem: req.body.specialItem,
        rankNeeded: req.body.rankNeeded,
      });
      const savedCase = await newCustomCase.save();
      res.json(savedCase);
      break;

    default:
      break;
  }
};
export default connectDB(handler);
