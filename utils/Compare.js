var stringSimilarity = require("string-similarity");

const getSuggestions = (selfNotes, othersNotes) => {
  const suggestions = [];
  for (let i = 0; i < othersNotes.length; i++) {
    const currentTargetString = othersNotes[i].notes;
    const currentRating = stringSimilarity.compareTwoStrings(
      selfNotes,
      currentTargetString
    );
    if (currentRating > 0.2) {
      suggestions.push({ target: othersNotes[i], rating: currentRating });
    }
  }
  suggestions.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
  console.log("---->Inside suggestion module", suggestions);
  return suggestions.map((suggestion) => suggestion.target.id).slice(0, 5);
};

module.exports = { getSuggestions };
