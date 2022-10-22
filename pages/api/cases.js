import connectDB from "../../lib/database/connectMongoDb";
import Case from "../../lib/database/schemas/case";
import Skingroup from "../../lib/database/schemas/skingroup";
import Skin from "../../lib/database/schemas/skin";

async function handler(req, res) {
  if (req.query.case) {
    const c = await Case.findById(req.query.case);
    const sk = c.skingroups;
    const skingroups = await Skingroup.find({ _id: sk });

    const onlyWeapons = skingroups.filter((sg) => sg.knifeType === null);
    console.log(onlyWeapons);

    let skins = [];
    for (const weaponGroup of onlyWeapons) {
      const weapon = await Skin.findOne({ classId: weaponGroup.skinIds[0] });
      skins.push(weapon);
    }
    return res.json(skins);
  }
  const cases = await Case.find({});
  res.json(cases);
}
export default connectDB(handler);
