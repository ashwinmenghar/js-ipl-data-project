import { readFile, writeFile } from "./helper.js";

// Number of matches won per team per year in IPL.
const yearwiseMatchesWonPerTeam = (data) => {
  const result = data.reduce((acc, curr) => {
    // if (curr.result == "no result") return acc;

    if (!acc[curr.season]) {
      acc[curr.season] = {};
    }
    if (!acc[curr.season][curr.winner]) {
      acc[curr.season][curr.winner] = 0;
    }
    acc[curr.season][curr.winner]++;
    return acc;
  }, {});

  writeFile(result, "2-matches-won-per-team-per-year.json");
};

readFile("../data/matches.json", (err, result) => {
  yearwiseMatchesWonPerTeam(result);
});
