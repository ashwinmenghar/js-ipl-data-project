// Find the highest number of times one player has been dismissed by another player
const getHighestNumberOfTimesDismissedPlayers = (deliveries) => {
  const dismissalStats = getDismissedResult(deliveries);
  return findMostDismissedPlayer(dismissalStats);
};

const getDismissedResult = (deliveries) => {
  let result = {};
  for (const { batsman, bowler, dismissal_kind } of deliveries) {
    if (dismissal_kind) {
      result[bowler] = result[bowler] || {};
      result[bowler][batsman] = (result[bowler][batsman] || 0) + 1;
    }
  }
  return result;
};

const findMostDismissedPlayer = (dismissedResult) => {
  let highestNumOfDismissedPlayer = "";
  let dismissedTimes = 0;

  for (const [bowler, batsmanStats] of Object.entries(dismissedResult)) {
    for (const [batsman, count] of Object.entries(batsmanStats)) {
      if (count > dismissedTimes) {
        dismissedTimes = count;
        highestNumOfDismissedPlayer = batsman;
      }
    }
  }

  return {
    player: highestNumOfDismissedPlayer,
    count: dismissedTimes,
  };
};

export default getHighestNumberOfTimesDismissedPlayers;
