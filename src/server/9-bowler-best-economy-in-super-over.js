import { readFile, writeFile } from "./index.js";

// Find the bowler with the best economy in super overs
const findBestEconomyInSuperOver = (deliveries) => {
  let bowlersList = {};

  for (let i = 0; i < deliveries.length; i++) {
    if (deliveries[i].is_super_over == 1) {
      let bowler = deliveries[i].bowler;
      let wideRuns = deliveries[i].wide_runs;
      let noBallRuns = deliveries[i].noball_runs;
      let totalRuns = Number(deliveries[i].total_runs);

      if (!bowlersList[bowler]) {
        bowlersList[bowler] = {
          totalRunsInSuperOver: 0,
          totalBallsInSuperOver: 0,
        };
      }

      bowlersList[bowler].totalRunsInSuperOver += totalRuns;
      if (wideRuns == 0 && noBallRuns == 0) {
        bowlersList[bowler].totalBallsInSuperOver++;
      }
    }
  }
  let bestEconomyBowlerName = "";
  let bestEconomy = Number.MAX_SAFE_INTEGER;

  for (let bowler in bowlersList) {
    let bowlerData = bowlersList[bowler];

    let totalBalls = bowlerData.totalBallsInSuperOver / 6;
    let totalRuns = Number(bowlerData.totalRunsInSuperOver);

    let totalEconomy = 0;
    if (totalBalls > 0) {
      totalEconomy = totalRuns / totalBalls;
    }

    if (totalEconomy < bestEconomy) {
      bestEconomy = totalEconomy;
      bestEconomyBowlerName = bowler;
    }
  }

  let result = {
    bowlerName: bestEconomyBowlerName,
    economy: bestEconomy,
  };

  writeFile(result, "9-bowler-best-economy-in-super-over.json");
};

readFile("../data/deliveries.json", (err, deliveries) => {
  if (err) {
    console.error("Error reading deliveries.json", err);
    return;
  }

  findBestEconomyInSuperOver(deliveries);
});
