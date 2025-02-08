import { readFile, writeFile } from "./index.js";

// Number of matches played per year for all the years in IPL.
function numberOfMatchesPlayed(data) {
  const res = data.reduce((acc, curr) => {
    if (acc[curr.season] === undefined) acc[curr.season] = 1;
    else acc[curr.season]++;
    return acc;
  }, {});

  writeFile(res, "1-matches-per-year.json");
}

readFile("../data/matches.json", (err, result) => {
  if (err) {
    console.log("Error reading file:", err.message);
  } else {
    numberOfMatchesPlayed(result);
  }
});
