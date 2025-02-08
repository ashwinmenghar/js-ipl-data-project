import { readFile, writeFile } from "./index.js";

// Find the number of times each team won the toss and also won the match
const getNumberOfTeamWonTossAndMatch = (matches) => {
  const result = matches.reduce((acc, match) => {
    if (match.toss_winner == match.winner) {
      if (!acc[match.winner]) acc[match.winner] = 0;
      acc[match.winner]++;
    }
    return acc;
  }, {});

  writeFile(result, "5-find-number-of-times-team-won-toss-and-won-match.json");
};

readFile("../data/matches.json", (err, matches) => {
  if (err) {
    console.error("Error reading matches.json", err);
    return;
  }

  getNumberOfTeamWonTossAndMatch(matches);
});
