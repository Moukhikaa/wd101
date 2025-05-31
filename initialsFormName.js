let createInitialsFromName = (name) => {
  // Split the name by spaces to get individual words
  let words = name.trim().split(/\s+/);

  let initials = "";

  if (words.length === 1) {
    // Single word: first two letters, uppercase
    initials = words[0].substring(0, 2);
  } else if (words.length === 2) {
    // Two words: first letter of each word, uppercase
    initials = words[0][0] + words[1][0];
  } else {
    // More than two words: first letter of first and last word
    initials = words[0][0] + words[words.length - 1][0];
  }

  // Convert to uppercase and return
  return initials.toUpperCase();
};

module.exports = createInitialsFromName;
