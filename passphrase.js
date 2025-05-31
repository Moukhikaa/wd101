let isValidPassphrase = (text) => {
  // Split the text into words based on spaces
  let words = text.split(" ");

  // Check if there are at least four words
  let minimumFourWords = words.length >= 4;

  // Check if every word has at least two characters
  let minimumTwoCharsEach = words.every(word => word.length >= 2);

  // Both conditions must be true for the passphrase to be valid
  let conditionsSatisfied = minimumFourWords && minimumTwoCharsEach;

  // Return the result
  return conditionsSatisfied;
}

module.exports = isValidPassphrase;
