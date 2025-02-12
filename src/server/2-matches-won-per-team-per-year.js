// Number of matches won per team per year in IPL.
const getAllIPLWonMatchesForSeason = (matches) => {
  return matches.reduce((seasonWins, match) => {
    const { season, winner } = match;
    if (!season || !winner) return seasonWins;

    if (!seasonWins[season]) {
      seasonWins[season] = {};
    }

    if (!seasonWins[season][winner]) {
      seasonWins[season][winner] = 0;
    }

    seasonWins[season][winner]++;
    return seasonWins;
  }, {});
};

export default getAllIPLWonMatchesForSeason;
