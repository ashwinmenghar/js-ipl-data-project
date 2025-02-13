import { readFile, writeFile } from "./src/server/helper.js";

const matches = readFile("src/data/matches.json");
const deliveries = readFile("src/data/deliveries.json");

import getNumberOfMatchesPlayed from "./src/server/1-matches-per-year.js";
import getAllIPLWonMatchesForSeason from "./src/server/2-matches-won-per-team-per-year.js";
import getExtraRunsByTeamInaSeason from "./src/server/3-matches-extra-runs-conceded-per-team.js";
import getTop10EconomicalBowlers from "./src/server/4-top-10-economical-bowlers-year-2015.js";
import getAllTeamsWhoWonMatchAndToss from "./src/server/5-find-number-of-times-team-won-toss-and-won-match.js";
import getHighestNumberPOTMAwardForSeason from "./src/server/6-find-player-who-won-highest-number-POTM-awards-each-season.js";

import getStrikeRateOfBatsmanBySeason from "./src/server/7-find-strike-rate-of-a-batsman-each-season.js";
import getHighestNumberOfTimesDismissedPlayers from "./src/server/8-maximum-times-player-dismissed-by-a-bowler.js";
import { getBestEconomyBowlerInSuperOvers } from "./src/server/9-bowler-best-economy-in-super-over.js";

// Collecting all data
const getNoOfMatchesPlayedByTeamInAllSeasons =
  getNumberOfMatchesPlayed(matches);
const wonMatches = getAllIPLWonMatchesForSeason(matches);
const extraRunsByTeam = getExtraRunsByTeamInaSeason(matches, deliveries, 2016);
const top10EconomicalBowlers = getTop10EconomicalBowlers(
  matches,
  deliveries,
  2015
);
const matchAndTossWonTeams = getAllTeamsWhoWonMatchAndToss(matches);
const highestNumberOfPlayerOfMatchAwardBySeason =
  getHighestNumberPOTMAwardForSeason(matches);

const strikeRateOfBatsmanBySeason = getStrikeRateOfBatsmanBySeason(
  matches,
  deliveries
);
const highestNumberOfTimesDismissedPlayers =
  getHighestNumberOfTimesDismissedPlayers(deliveries);
const bestEconomyBowlerInSuperOvers =
  getBestEconomyBowlerInSuperOvers(deliveries);

// Writing all data
writeFile(getNoOfMatchesPlayedByTeamInAllSeasons, "1-matches-per-year.json");
writeFile(wonMatches, "2-matches-won-per-team-per-year.json");
writeFile(extraRunsByTeam, "3-matches-extra-runs-conceded-per-team.json");
writeFile(top10EconomicalBowlers, "4-top-10-economical-bowlers-year-2015.json");
writeFile(
  matchAndTossWonTeams,
  "5-find-number-of-times-team-won-toss-and-won-match.json"
);
writeFile(
  highestNumberOfPlayerOfMatchAwardBySeason,
  "6-find-player-who-won-highest-number-POTM-awards-each-season.json"
);
writeFile(
  strikeRateOfBatsmanBySeason,
  "7-find-strike-rate-of-a-batsman-each-season.json"
);
writeFile(
  highestNumberOfTimesDismissedPlayers,
  "8-maximum-times-player-dismissed-by-a-bowler.json"
);
writeFile(
  bestEconomyBowlerInSuperOvers,
  "9-bowler-best-economy-in-super-over.json"
);
