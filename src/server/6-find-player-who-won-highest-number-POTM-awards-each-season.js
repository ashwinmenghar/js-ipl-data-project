// Find a player who has won the highest number of Player of the Match awards for each season
const getHighestNumberPOTMAwardForSeason = (matches) => {
  const playersWonPOTMAward = {};

  for (let { season, player_of_match } of matches) {
    if (!playersWonPOTMAward[season]) {
      playersWonPOTMAward[season] = {};
    }
    playersWonPOTMAward[season][player_of_match] =
      (playersWonPOTMAward[season][player_of_match] || 0) + 1;
  }

  return getTopPOTMWinnerPerSeason(playersWonPOTMAward);
};

const getTopPOTMWinnerPerSeason = (players) => {
  let topPlayers = {};
  for (let season of Object.keys(players)) {
    topPlayers[season] = findTopPlayer(players[season]);
  }
  return topPlayers;
};

const findTopPlayer = (seasonPlayers) => {
  let result = { player: "", awards: 0 };

  for (let playerAndAward of Object.entries(seasonPlayers)) {
    const player = playerAndAward[0];
    const awards = playerAndAward[1];

    if (awards > result.awards) {
      result = { player, awards };
    }
  }
  return result.player;
};

export default getHighestNumberPOTMAwardForSeason;
