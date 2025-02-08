import { readFile, writeFile } from "./index.js";
/**
 * {
    "match_id": "61",
    "inning": "1",
    "batting_team": "Chennai Super Kings",
    "bowling_team": "Kings XI Punjab",
    "over": "3",
    "ball": "2",
    "batsman": "ML Hayden",
    "non_striker": "PA Patel",
    "bowler": "B Lee",
    "is_super_over": "0",
    "wide_runs": "0",
    "bye_runs": "0",
    "legbye_runs": "0",
    "noball_runs": "1",
    "penalty_runs": "0",
    "batsman_runs": "4",
    "extra_runs": "1",
    "total_runs": "5",
    "player_dismissed": "",
    "dismissal_kind": "",
    "fielder": ""
  },
 */

// Find the strike rate of a batsman for each season
const findStrikeRateOfAPlayer = (matches, deliveries) => {
  const matchSeasonMap = new Map(matches.map(({ id, season }) => [id, season]));

  const batsmanStats = deliveries.reduce((result, delivery) => {
    let season = matchSeasonMap.get(delivery.match_id);
    if (!season) return result;

    const batsman = delivery.batsman;
    const batsman_runs = Number(delivery.batsman_runs);
    const extra_runs = delivery.extra_runs;
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

  const formattedOutput = Object.entries(batsmanStats).reduce(
    (getYearsWithPlayersStats, [season, seasonStats]) => {
      getYearsWithPlayersStats[season] = Object.entries(seasonStats).reduce(
        (allPlayerStats, [batsman, { balls, runs }]) => {
          let strikeRate = (runs / balls) * 100;
          allPlayerStats[batsman] = strikeRate.toFixed(2);

          return allPlayerStats;
        },
        {}
      );

      return getYearsWithPlayersStats;
    },
    {}
  );

  writeFile(
    formattedOutput,
    "7-find-strike-rate-of-a-batsman-each-season.json"
  );
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

    findStrikeRateOfAPlayer(matchData, deliveryData);
  });
});
