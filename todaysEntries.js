function todaysEntries(entries) {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().slice(0, 10);

  // Filter entries where the date portion matches today
  const matchingNames = entries
    .filter(entry => entry.date.slice(0, 10) === today)
    .map(entry => entry.name);

  // Join the names with comma (no spaces)
  return matchingNames.join(",");
}

module.exports = todaysEntries;
