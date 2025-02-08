import { readFile, writeFile } from "./helper.js";

// Find the highest number of times one player has been dismissed by another player
const findHighestNumberDismissed = (deliveries) => {
  let dismissedResult = deliveries.reduce(
    (result, { batsman, bowler, dismissal_kind }) => {
      if (dismissal_kind) {
        if (!result[bowler]) result[bowler] = {};
        if (!result[bowler][batsman]) result[bowler][batsman] = 0;
        result[bowler][batsman]++;
      }

      return result;
    },
    {}
  );

  let highestNumOfDismissedPlayer = "";
  let dismissedTimes = 0;

  Object.entries(dismissedResult).forEach(([bowler, batsmanStats]) => {
    Object.entries(batsmanStats).forEach(([batsman, count]) => {
      if (count > dismissedTimes) {
        dismissedTimes = count;
        highestNumOfDismissedPlayer = batsman;
      }
    });
  });

  let result = {
    player: highestNumOfDismissedPlayer,
    count: dismissedTimes,
  };

  writeFile(result, "8-maximum-times-player-dismissed-by-a-bowler.json");
};

readFile("../data/deliveries.json", (err, deliveries) => {
  if (err) {
    console.error("Error reading deliveries.json", err);
    return;
  }

  findHighestNumberDismissed(deliveries);
});
