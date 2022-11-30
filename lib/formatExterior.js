const formatExterior = (name, exterior) => {
  let namePartOne = name.split("|").shift();
  namePartOne = namePartOne.split("Souvenir").pop();
  namePartOne = namePartOne.split("StatTrak™").pop();
  namePartOne = namePartOne.split("★").pop();
  let namePartTwo = name.split("(").shift();
  namePartTwo = namePartTwo.split("|").pop();
  let shortExterior;
  switch (exterior) {
    case "Factory New":
      shortExterior = "FN";
      break;
    case "Minimal Wear":
      shortExterior = "MW";
      break;
    case "Field-Tested":
      shortExterior = "FT";
      break;
    case "Well-Worn":
      shortExterior = "WW";
      break;
    case "Battle-Scarred":
      shortExterior = "BS";
      break;
    default:
      namePartTwo = "Vanilla";
      shortExterior = "\u2605";
      break;
  }
  return { namePartOne, namePartTwo, shortExterior };
};

export default formatExterior;
