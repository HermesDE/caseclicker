export default function xpToRank(xp) {
  const rank = {};
  if (xp < 1000) {
    rank.id = 1;
    rank.name = "Silver I";
    rank.short = "S1";
    rank.image = "/pictures/ranks/s1.png";
    rank.xpNeeded = 0;
    rank.xpNeededForRankup = 1000;
  } else if (xp < 3000) {
    rank.id = 2;
    rank.name = "Silver II";
    rank.short = "S2";
    rank.image = "/pictures/ranks/s2.png";
    rank.xpNeeded = 1000;
    rank.xpNeededForRankup = 3000;
  } else if (xp < 5000) {
    rank.id = 3;
    rank.name = "Silver III";
    rank.short = "S3";
    rank.image = "/pictures/ranks/s3.png";
    rank.xpNeeded = 3000;
    rank.xpNeededForRankup = 5000;
  } else if (xp < 7500) {
    rank.id = 4;
    rank.name = "Silver IV";
    rank.short = "S4";
    rank.image = "/pictures/ranks/s4.png";
    rank.xpNeeded = 5000;
    rank.xpNeededForRankup = 7500;
  } else if (xp < 10000) {
    rank.id = 5;
    rank.name = "Silver Elite";
    rank.short = "SE";
    rank.image = "/pictures/ranks/se.png";
    rank.xpNeeded = 7500;
    rank.xpNeededForRankup = 10000;
  } else if (xp < 12500) {
    rank.id = 6;
    rank.name = "Silver Elite Master";
    rank.short = "SEM";
    rank.image = "/pictures/ranks/sem.png";
    rank.xpNeeded = 10000;
    rank.xpNeededForRankup = 12500;
  } else if (xp < 15000) {
    rank.id = 7;
    rank.name = "Gold Nova I";
    rank.short = "GN1";
    rank.image = "/pictures/ranks/gn1.png";
    rank.xpNeeded = 12500;
    rank.xpNeededForRankup = 15000;
  } else if (xp < 20000) {
    rank.id = 8;
    rank.name = "Gold Nova II";
    rank.short = "GN2";
    rank.image = "/pictures/ranks/gn2.png";
    rank.xpNeeded = 15000;
    rank.xpNeededForRankup = 20000;
  } else if (xp < 25000) {
    rank.id = 9;
    rank.name = "Gold Nova III";
    rank.short = "GN3";
    rank.image = "/pictures/ranks/gn3.png";
    rank.xpNeeded = 20000;
    rank.xpNeededForRankup = 25000;
  } else if (xp < 40000) {
    rank.id = 10;
    rank.name = "Gold Nova Master";
    rank.short = "GNM";
    rank.image = "/pictures/ranks/gnm.png";
    rank.xpNeeded = 25000;
    rank.xpNeededForRankup = 40000;
  } else if (xp < 50000) {
    rank.id = 11;
    rank.name = "Master Guardian I";
    rank.short = "MG1";
    rank.image = "/pictures/ranks/mg1.png";
    rank.xpNeeded = 40000;
    rank.xpNeededForRankup = 50000;
  } else if (xp < 60000) {
    rank.id = 12;
    rank.name = "Master Guardian II";
    rank.short = "MG2";
    rank.image = "/pictures/ranks/mg2.png";
    rank.xpNeeded = 50000;
    rank.xpNeededForRankup = 60000;
  } else if (xp < 75000) {
    rank.id = 13;
    rank.name = "Master Guardian Elite";
    rank.short = "MGE";
    rank.image = "/pictures/ranks/mge.png";
    rank.xpNeeded = 60000;
    rank.xpNeededForRankup = 75000;
  } else if (xp < 100000) {
    rank.id = 14;
    rank.name = "Distinguished Master Guardian";
    rank.short = "DMG";
    rank.image = "/pictures/ranks/dmg.png";
    rank.xpNeeded = 75000;
    rank.xpNeededForRankup = 100000;
  } else if (xp < 150000) {
    rank.id = 15;
    rank.name = "Legendary Eagle";
    rank.short = "LE";
    rank.image = "/pictures/ranks/le.png";
    rank.xpNeeded = 100000;
    rank.xpNeededForRankup = 150000;
  } else if (xp < 250000) {
    rank.id = 16;
    rank.name = "Legendary Eagle Master";
    rank.short = "LEM";
    rank.image = "/pictures/ranks/lem.png";
    rank.xpNeeded = 150000;
    rank.xpNeededForRankup = 250000;
  } else if (xp < 500000) {
    rank.id = 17;
    rank.name = "Supreme Master First Class";
    rank.short = "LMFC";
    rank.image = "/pictures/ranks/lmfc.png";
    rank.xpNeeded = 250000;
    rank.xpNeededForRankup = 500000;
  } else if (xp >= 500000) {
    rank.id = 18;
    rank.name = "Global Elite";
    rank.short = "GE";
    rank.image = "/pictures/ranks/ge.png";
    rank.xpNeeded = 500000;
    rank.xpNeededForRankup = 500000;
  }
  return rank;
}
