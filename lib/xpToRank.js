export default function xpToRank(xp) {
  const rank = {};
  if (xp <= 0) {
    rank.id = 1;
    rank.name = "Silver I";
    rank.short = "S1";
    rank.image = "/pictures/ranks/s1.jpg";
    rank.xpNeeded = 0;
    rank.xpNeededForRankup = 5000;
  } else if (xp < 5000) {
    rank.id = 2;
    rank.name = "Silver II";
    rank.short = "S2";
    rank.image = "/pictures/ranks/s2.jpg";
    rank.xpNeeded = 5000;
    rank.xpNeededForRankup = 10000;
  } else if (xp < 10000) {
    rank.id = 3;
    rank.name = "Silver III";
    rank.short = "S3";
    rank.image = "/pictures/ranks/s3.jpg";
    rank.xpNeeded = 10000;
    rank.xpNeededForRankup = 15000;
  } else if (xp < 15000) {
    rank.id = 4;
    rank.name = "Silver IV";
    rank.short = "S4";
    rank.image = "/pictures/ranks/s4.jpg";
    rank.xpNeeded = 15000;
    rank.xpNeededForRankup = 20000;
  } else if (xp < 20000) {
    rank.id = 5;
    rank.name = "Silver Elite";
    rank.short = "SE";
    rank.image = "/pictures/ranks/se.jpg";
    rank.xpNeeded = 20000;
    rank.xpNeededForRankup = 25000;
  } else if (xp < 25000) {
    rank.id = 6;
    rank.name = "Silver Elite Master";
    rank.short = "SEM";
    rank.image = "/pictures/ranks/sem.jpg";
    rank.xpNeeded = 25000;
    rank.xpNeededForRankup = 30000;
  } else if (xp < 30000) {
    rank.id = 7;
    rank.name = "Gold Nova I";
    rank.short = "GN1";
    rank.image = "/pictures/ranks/gn1.jpg";
    rank.xpNeeded = 30000;
    rank.xpNeededForRankup = 40000;
  } else if (xp < 40000) {
    rank.id = 8;
    rank.name = "Gold Nova II";
    rank.short = "GN2";
    rank.image = "/pictures/ranks/gn2.jpg";
    rank.xpNeeded = 40000;
    rank.xpNeededForRankup = 50000;
  } else if (xp < 50000) {
    rank.id = 9;
    rank.name = "Gold Nova III";
    rank.short = "GN3";
    rank.image = "/pictures/ranks/gn3.jpg";
    rank.xpNeeded = 50000;
    rank.xpNeededForRankup = 60000;
  } else if (xp < 60000) {
    rank.id = 10;
    rank.name = "Gold Nova Master";
    rank.short = "GNM";
    rank.image = "/pictures/ranks/gnm.jpg";
    rank.xpNeeded = 60000;
    rank.xpNeededForRankup = 75000;
  } else if (xp < 75000) {
    rank.id = 11;
    rank.name = "Master Guardian I";
    rank.short = "MG1";
    rank.image = "/pictures/ranks/mg1.jpg";
    rank.xpNeeded = 75000;
    rank.xpNeededForRankup = 100000;
  } else if (xp < 100000) {
    rank.id = 12;
    rank.name = "Master Guardian II";
    rank.short = "MG2";
    rank.image = "/pictures/ranks/mg2.jpg";
    rank.xpNeeded = 100000;
    rank.xpNeededForRankup = 125000;
  } else if (xp < 125000) {
    rank.id = 13;
    rank.name = "Master Guardian Elite";
    rank.short = "MGE";
    rank.image = "/pictures/ranks/mge.jpg";
    rank.xpNeeded = 125000;
    rank.xpNeededForRankup = 150000;
  } else if (xp < 150000) {
    rank.id = 14;
    rank.name = "Distinguished Master Guardian";
    rank.short = "DMG";
    rank.image = "/pictures/ranks/dmg.jpg";
    rank.xpNeeded = 150000;
    rank.xpNeededForRankup = 200000;
  } else if (xp < 200000) {
    rank.id = 15;
    rank.name = "Legendary Eagle";
    rank.short = "LE";
    rank.image = "/pictures/ranks/le.jpg";
    rank.xpNeeded = 200000;
    rank.xpNeededForRankup = 300000;
  } else if (xp < 300000) {
    rank.id = 16;
    rank.name = "Legendary Eagle Master";
    rank.short = "LEM";
    rank.image = "/pictures/ranks/lem.jpg";
    rank.xpNeeded = 300000;
    rank.xpNeededForRankup = 400000;
  } else if (xp < 400000) {
    rank.id = 17;
    rank.name = "Supreme Master First Class";
    rank.short = "LMFC";
    rank.image = "/pictures/ranks/lmfc.jpg";
    rank.xpNeeded = 400000;
    rank.xpNeededForRankup = 500000;
  } else if (xp >= 500000) {
    rank.id = 18;
    rank.name = "Global Elite";
    rank.short = "GE";
    rank.image = "/pictures/ranks/ge.jpg";
    rank.xpNeeded = 500000;
    rank.xpNeededForRankup = 500000;
  }
  return rank;
}
