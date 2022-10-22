import connectDB from "../../lib/database/connectMongoDb";
import Case from "../../lib/database/schemas/case";

async function handler(req, res) {
  const cases = await Case.find({});
  res.json(cases);
}
export default connectDB(handler);
