import numberOfMatchesPlayed from "./src/server/1-matches-per-year.js";
import getAllIPLWonMatchesForSeason from "./src/server/2-matches-won-per-team-per-year.js";
import getExtraRunsByTeamInaSeason from "./src/server/3-matches-extra-runs-conceded-per-team.js";
import { readFile, writeFile } from "./src/server/helper.js";

const matches = readFile("src/data/matches.json");
const deliveries = readFile("src/data/deliveries.json");

// Collecting all data
const getNoOfMatchesPlayedByTeamInAllSeasons = numberOfMatchesPlayed(matches);
const wonMatches = getAllIPLWonMatchesForSeason(matches);
const extraRunsByTeam = getExtraRunsByTeamInaSeason(matches, deliveries, 2016);

// Writing all data
writeFile(getNoOfMatchesPlayedByTeamInAllSeasons, "1-matches-per-year.json");
writeFile(wonMatches, "2-matches-won-per-team-per-year.json");
writeFile(extraRunsByTeam, "3-matches-extra-runs-conceded-per-team");
