import { getMatchesId } from "./helper.js";

// Top 10 economical bowlers in the year 2015
const getTop10EconomicalBowlers = (matches, deliveries, season) => {
  const matchesId = getMatchesId(matches, season);

  const bowlerStats = deliveries.reduce(
    (
      bowlerStats,
      { match_id, bowler, wide_runs, noball_runs, batsman_runs }
    ) => {
      if (matchesId.has(match_id)) {
        const isLegalDelivery = wide_runs === "0" && noball_runs === "0";
        const runsGiven =
          Number(wide_runs) + Number(noball_runs) + Number(batsman_runs);

        if (!bowlerStats[bowler])
          bowlerStats[bowler] = { runsGiven: 0, ballsBowled: 0 };

        bowlerStats[bowler].runsGiven += runsGiven;
        if (isLegalDelivery) bowlerStats[bowler].ballsBowled++;
      }
      return bowlerStats;
    },
    {}
  );
  const formattedBowlersEco = formatBowlersEconomy(bowlerStats);
  return formatEconomyRates(formattedBowlersEco);
};

const formatBowlersEconomy = (bowlersArr) => {
  return Object.entries(bowlersArr)
    .map(([bowler, stats]) => ({
      bowler,
      economy: (stats.runsGiven / stats.ballsBowled) * 6,
    }))
    .sort((a, b) => a.economy - b.economy)
    .slice(0, 10);
};

const formatEconomyRates = (bowlersArr) => {
  return Object.fromEntries(
    bowlersArr.map(({ bowler, economy }) => [bowler, economy.toFixed(2)])
  );
};

export default getTop10EconomicalBowlers;
