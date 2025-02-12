// Find a player who has won the highest number of Player of the Match awards for each season
const getHighestNumberPOTMAwardForSeason = (matches) => {
  const seasonWisePlayers = matches.reduce((playersWonPOTMAward, curr) => {
    if (!playersWonPOTMAward[curr.season])
      playersWonPOTMAward[curr.season] = {};

    if (!playersWonPOTMAward[curr.season][curr.player_of_match])
      playersWonPOTMAward[curr.season][curr.player_of_match] = 0;

    playersWonPOTMAward[curr.season][curr.player_of_match]++;
    return playersWonPOTMAward;
  }, {});

  return getTopPOTMWinnerPerSeason(seasonWisePlayers);
};

const getTopPOTMWinnerPerSeason = (players) => {
  return Object.keys(players).reduce((acc, season) => {
    acc[season] = findTopPlayer(players[season]);
    return acc;
  }, {});
};

const findTopPlayer = (seasonPlayers) => {
  return Object.entries(seasonPlayers).reduce(
    (top, [player, awards]) => (awards > top.awards ? { player, awards } : top),
    { player: "", awards: 0 }
  ).player;
};

export default getHighestNumberPOTMAwardForSeason;
