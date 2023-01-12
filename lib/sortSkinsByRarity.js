export default function sortSkinsByRarity(skins) {
  const ordering = {}, // map for efficient lookup of sortIndex
    sortOrder = [
      "Extraordinary",
      "Covert",
      "Classified",
      "Restricted",
      "Mil-Spec Grade",
      "Industrial Grade",
      "Consumer Grade",
    ];
  for (let i = 0; i < sortOrder.length; i++) ordering[sortOrder[i]] = i;

  return skins.sort(function (a, b) {
    return (
      ordering[a.rarity] - ordering[b.rarity] || a.name.localeCompare(b.name)
    );
  });
}
