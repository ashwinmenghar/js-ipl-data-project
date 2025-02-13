// Number of matches won per team per year in IPL.
const getAllIPLWonMatchesForSeason = (matches) => {
  let seasonWins = {};

  for (let match of matches) {
    const { season, winner } = match;
    if (!season || !winner) continue;

    if (!seasonWins[season]) {
      seasonWins[season] = {};
    }

    if (!seasonWins[season][winner]) {
      seasonWins[season][winner] = 0;
    }
    seasonWins[season][winner]++;
  }

  return seasonWins;
};

export default getAllIPLWonMatchesForSeason;
