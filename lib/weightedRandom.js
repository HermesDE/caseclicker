export default function weightedRandom(values) {
  let i,
    pickedValue,
    randomNr = Math.random(),
    threshold = 0;

  for (i = 0; i < values.length; i++) {
    threshold += values[i].percentage / 100;
    if (threshold > randomNr) {
      pickedValue = values[i].skingroup;
      break;
    }
  }

  return pickedValue;
}
