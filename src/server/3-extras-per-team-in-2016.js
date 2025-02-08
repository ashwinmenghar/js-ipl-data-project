import { readFile, writeFile } from "./index.js";

const extrasPerTeamIn2016 = (matchData, deliveryData) => {
  const matchIds = matchData.reduce((acc, match) => {
    if (match.season == 2016) acc.push(match.id);
    return acc;
  }, []);

  let data = deliveryData.reduce((acc, delivery) => {
    if (matchIds.includes(delivery.match_id)) {
      const team = delivery.bowling_team;
      const extraRuns = parseInt(delivery.extra_runs);

      if (acc[team] === undefined) {
        acc[team] = extraRuns;
      } else {
        acc[team] += extraRuns;
      }
    }

    return acc;
  }, {});
  writeFile(data, "3-extras-per-team-in-2016.json");
};

// Read match data first, then delivery data sequentially
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

    extrasPerTeamIn2016(matchData, deliveryData);
  });
});
