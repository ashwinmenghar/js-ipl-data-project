// Find the strike rate of a batsman for each season
const getStrikeRateOfBatsmanBySeason = (matches, deliveries) => {
  const matchSeasonMap = getAllMatchIdInSeason(matches);

  const batsmanStats = {};

  for (const { match_id, batsman_runs, batsman, wide_runs } of deliveries) {
    let season = matchSeasonMap.get(match_id);
    if (!season) continue;

    if (!batsmanStats[season]) {
      batsmanStats[season] = {};
    }

    if (!batsmanStats[season][batsman]) {
      batsmanStats[season][batsman] = { balls: 0, runs: 0 };
    }

    if (wide_runs === "0") batsmanStats[season][batsman].balls++;
    batsmanStats[season][batsman].runs += Number(batsman_runs);
  }

  return calculateStrikeRates(batsmanStats);
};

const getAllMatchIdInSeason = (matches) => {
  return new Map(matches.map(({ id, season }) => [id, season]));
};

const calculateStrikeRates = (batsmanStats) => {
  let yearsWithPlayerStats = {};

  for (let [season, seasonStats] of Object.entries(batsmanStats)) {
    let allPlayerStats = {};

    for (let [batsman, { balls, runs }] of Object.entries(seasonStats)) {
      let strikeRate = (runs / balls) * 100;
      allPlayerStats[batsman] = strikeRate.toFixed(2);
    }
    yearsWithPlayerStats[season] = allPlayerStats;
  }

  return yearsWithPlayerStats;
};

export default getStrikeRateOfBatsmanBySeason;
