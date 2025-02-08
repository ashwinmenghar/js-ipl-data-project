import { readFile, writeFile } from "./index.js";
// Find a player who has won the highest number of Player of the Match awards for each season

const getPlayerWonHighestNumberPOTMAward = (matches) => {
  const players = matches.reduce((acc, curr) => {
    if (!acc[curr.season]) acc[curr.season] = {};

    if (!acc[curr.season][curr.player_of_match])
      acc[curr.season][curr.player_of_match] = 0;

    acc[curr.season][curr.player_of_match]++;
    return acc;
  }, {});

  const maxPlayerOfTheMatchYearwise = Object.keys(players).reduce(
    (acc, season) => {
      const allPlayers = players[season];

      let topPlayer = "";
      let noOfPOTM = 0;

      for (let key in allPlayers) {
        if (allPlayers[key] > noOfPOTM) {
          noOfPOTM = allPlayers[key];
          topPlayer = key;
        }
      }
      acc[season] = topPlayer;
      return acc;
    },
    {}
  );

  writeFile(
    maxPlayerOfTheMatchYearwise,
    "6-find-player-who-won-highest-number-POTM-awards-each-season.json"
  );
};

readFile("../data/matches.json", (err, matches) => {
  if (err) {
    console.error("Error reading matches.json", err);
    return;
  }

  getPlayerWonHighestNumberPOTMAward(matches);
});
