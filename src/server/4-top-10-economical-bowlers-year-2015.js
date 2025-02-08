import { readFile, writeFile } from "./helper.js";

// Top 10 economical bowlers in the year 2015
const top10EconomicalBowlersInYear2015 = (matches, deliveries) => {
  const matchIds2015 = new Set(
    matches.filter((match) => match.season == 2015).map((match) => match.id)
  );

  let bowlersData = {};

  deliveries.forEach((delivery) => {
    if (matchIds2015.has(delivery.match_id)) {
      const bowler = delivery.bowler;
      const runsGiven =
        parseInt(delivery.wide_runs) +
        parseInt(delivery.noball_runs) +
        parseInt(delivery.batsman_runs);

      const isLegalDelivery =
        delivery.wide_runs === "0" && delivery.noball_runs === "0";

      if (!bowlersData[bowler]) {
        bowlersData[bowler] = { runsGiven: 0, ballsBowled: 0 };
      }

      bowlersData[bowler].runsGiven += runsGiven;
      if (isLegalDelivery) bowlersData[bowler].ballsBowled++;
    }
  });

  const bowlersArr = Object.entries(bowlersData)
    .map(([bowler, stats]) => ({
      bowler,
      economy: (stats.runsGiven / stats.ballsBowled) * 6,
    }))
    .sort((a, b) => a.economy - b.economy)
    .slice(0, 10);

  const result = Object.fromEntries(
    bowlersArr.map(({ bowler, economy }) => [bowler, economy.toFixed(2)])
  );

  writeFile(result, "4-top-10-economical-bowlers-year-2015.json");
};

readFile("../data/matches.json", (err, matchData) => {
  if (err) {
    console.error("Error reading matches.json", err);
    return;
  }

  readFile("../data/deliveries.json", (err, deliveryData) => {
    if (err) {
      console.error("Error reading deliveries.json", err);
      return;
    }

    top10EconomicalBowlersInYear2015(matchData, deliveryData);
  });
});
