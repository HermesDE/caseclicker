const generateFloat = (exterior) => {
  let min, max;
  switch (exterior) {
    case "Factory New":
      min = 0;
      max = 0.07;
      break;
    case "Minimal Wear":
      min = 0.07;
      max = 0.15;
      break;
    case "Field-Tested":
      min = 0.15;
      max = 0.38;
      break;
    case "Well-Worn":
      min = 0.38;
      max = 0.45;
      break;
    case "Battle-Scarred":
      min = 0.45;
      max = 1;
      break;
    default:
      return null;
  }
  return Math.random() * (max - min) + min;
};

export default generateFloat;
