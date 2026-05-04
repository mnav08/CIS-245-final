const MoodMapInsights = {
  requiredEntries: 7,

  getAverage(entries, field) {
    if (!entries.length) {
      return 0;
    }

    const total = entries.reduce((sum, entry) => sum + Number(entry[field]), 0);
    return Math.round((total / entries.length) * 10) / 10;
  },

  getStreak(entries) {
    const dates = new Set(entries.map((entry) => entry.date));
    let streak = 0;
    const currentDate = new Date();

    while (dates.has(MoodMapEntries.formatDate(currentDate))) {
      streak += 1;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  }
};
