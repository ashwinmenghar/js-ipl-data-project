import { getMatchesId } from "./helper.js";

// Top 10 economical bowlers in the year 2015
const getTop10EconomicalBowlers = (matches, deliveries, season) => {
  const matchIdsForSeason = getMatchesId(matches, season);
  const bowlerStats = {};

  for (let delivery of deliveries) {
    const { match_id, bowler, wide_runs, noball_runs, batsman_runs } = delivery;

    if (matchIdsForSeason.has(match_id)) {
      const isLegalDelivery = wide_runs === "0" && noball_runs === "0";
      const runsConceded =
        Number(wide_runs) + Number(noball_runs) + Number(batsman_runs);

      if (!bowlerStats[bowler])
        bowlerStats[bowler] = { runsConceded: 0, ballsBowled: 0 };

      bowlerStats[bowler].runsConceded += runsConceded;
      if (isLegalDelivery) bowlerStats[bowler].ballsBowled++;
    }
  }

  const topBowlersByEconomy = calculateBowlersEconomy(bowlerStats);
  return convertToEconomyMap(topBowlersByEconomy);
};

const calculateBowlersEconomy = (bowlersArr) => {
  let bowlersEconomyList = [];
  for (let [bowler, stats] of Object.entries(bowlersArr)) {
    let economy = ((stats.runsConceded / stats.ballsBowled) * 6).toFixed(2);

    bowlersEconomyList.push({
      bowler,
      economy: Number(economy),
    });
  }

  return bowlersEconomyList.sort((a, b) => a.economy - b.economy).slice(0, 10);
};

const convertToEconomyMap = (bowlersArr) => {
  return Object.fromEntries(
    bowlersArr.map(({ bowler, economy }) => [bowler, economy.toFixed(2)])
  );
};

export default getTop10EconomicalBowlers;
