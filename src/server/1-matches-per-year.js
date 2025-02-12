// import { readFile, writeFile } from "./helper.js";

// Number of matches played per year for all the years in IPL.
// readFile("../data/matches.json", (err, result) => {
//   if (err) {
//     console.log("Error reading file:", err.message);
//   } else {
//     // numberOfMatchesPlayed(result);
//     console.log(result);
//   }
// });

const numberOfMatchesPlayed = (data) => {
  return data.reduce((acc, curr) => {
    if (acc[curr.season] === undefined) acc[curr.season] = 1;
    else acc[curr.season]++;
    return acc;
  }, {});
};

// console.log(numberOfMatchesPlayed);

// writeFile(numberOfMatchesPlayed, "1-matches-per-year.json");

export default numberOfMatchesPlayed;
