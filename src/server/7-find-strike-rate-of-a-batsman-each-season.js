// Find the strike rate of a batsman for each season
const getStrikeRateOfBatsmanBySeason = (matches, deliveries) => {
  const matchSeasonMap = getAllMatchIdInSeason(matches);

  const batsmanStats = deliveries.reduce((result, delivery) => {
    let season = matchSeasonMap.get(delivery.match_id);
    if (!season) return result;

    const batsman = delivery.batsman;
    const batsman_runs = Number(delivery.batsman_runs);
    const wideRuns = Number(delivery.wide_runs);

    if (!result[season]) {
      result[season] = {};
    }

    if (!result[season][batsman]) {
      result[season][batsman] = { balls: 0, runs: 0 };
    }

    if (wideRuns === 0) result[season][batsman].balls++;
    result[season][batsman].runs += batsman_runs;

    return result;
  }, {});

  return calculateStrikeRates(batsmanStats);
};

const getAllMatchIdInSeason = (matches) => {
  return new Map(matches.map(({ id, season }) => [id, season]));
};

const calculateStrikeRates = (batsmanStats) => {
  return Object.entries(batsmanStats).reduce(
    (yearsWithPlayerStats, [season, seasonStats]) => {
      yearsWithPlayerStats[season] = Object.entries(seasonStats).reduce(
        (allPlayerStats, [batsman, { balls, runs }]) => {
          let strikeRate = (runs / balls) * 100;
          allPlayerStats[batsman] = strikeRate.toFixed(2);
          return allPlayerStats;
        },
        {}
      );
      return yearsWithPlayerStats;
    },
    {}
  );
};

export default getStrikeRateOfBatsmanBySeason;
