// Find the highest number of times one player has been dismissed by another player
const getHighestNumberOfTimesDismissedPlayers = (deliveries) => {
  const dismissalStats = getDismissedResult(deliveries);
  return findMostDismissedPlayer(dismissalStats);
};

const getDismissedResult = (deliveries) => {
  return deliveries.reduce((result, { batsman, bowler, dismissal_kind }) => {
    if (dismissal_kind) {
      result[bowler] = result[bowler] || {};
      result[bowler][batsman] = (result[bowler][batsman] || 0) + 1;
    }
    return result;
  }, {});
};

const findMostDismissedPlayer = (dismissedResult) => {
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

  return {
    player: highestNumOfDismissedPlayer,
    count: dismissedTimes,
  };
};

export default getHighestNumberOfTimesDismissedPlayers;
