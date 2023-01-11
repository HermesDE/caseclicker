export default function findRankById(id) {
  const rank = {};
  switch (id) {
    case 1:
      rank.name = "Silver I";
      rank.short = "S1";
      rank.image = "/pictures/ranks/s1.png";
      break;
    case 2:
      rank.name = "Silver II";
      rank.short = "S2";
      rank.image = "/pictures/ranks/s2.png";
      break;
    case 3:
      rank.name = "Silver III";
      rank.short = "S3";
      rank.image = "/pictures/ranks/s3.png";
      break;
    case 4:
      rank.name = "Silver IV";
      rank.short = "S4";
      rank.image = "/pictures/ranks/s4.png";
      break;
    case 5:
      rank.name = "Silver Elite";
      rank.short = "SE";
      rank.image = "/pictures/ranks/se.png";
      break;
    case 6:
      rank.name = "Silver Elite Master";
      rank.short = "SEM";
      rank.image = "/pictures/ranks/sem.png";
      break;
    case 7:
      rank.name = "Gold Nova I";
      rank.short = "GN1";
      rank.image = "/pictures/ranks/gn1.png";
      break;
    case 8:
      rank.name = "Gold Nova II";
      rank.short = "GN2";
      rank.image = "/pictures/ranks/gn2.png";
      break;
    case 9:
      rank.name = "Gold Nova III";
      rank.short = "GN3";
      rank.image = "/pictures/ranks/gn3.png";
      break;
    case 10:
      rank.name = "Gold Nova Master";
      rank.short = "GNM";
      rank.image = "/pictures/ranks/gnm.png";
      break;
    case 11:
      rank.name = "Master Guardian I";
      rank.short = "MG1";
      rank.image = "/pictures/ranks/mg1.png";
      break;
    case 12:
      rank.name = "Master Guardian II";
      rank.short = "MG2";
      rank.image = "/pictures/ranks/mg2.png";
      break;
    case 13:
      rank.name = "Master Guardian Elite";
      rank.short = "MGE";
      rank.image = "/pictures/ranks/mge.png";
      break;
    case 14:
      rank.name = "Distinguished Master Guardian";
      rank.short = "DMG";
      rank.image = "/pictures/ranks/dmg.png";
      break;
    case 15:
      rank.name = "Legendary Eagle";
      rank.short = "LE";
      rank.image = "/pictures/ranks/le.png";
      break;
    case 16:
      rank.name = "Legendary Eagle Master";
      rank.short = "LEM";
      rank.image = "/pictures/ranks/lem.png";
      break;
    case 17:
      rank.name = "Supreme Master First Class";
      rank.short = "LMFC";
      rank.image = "/pictures/ranks/lmfc.png";
      break;
    case 18:
      rank.name = "Global Elite";
      rank.short = "GE";
      rank.image = "/pictures/ranks/ge.png";
      break;
  }
  return rank;
}
