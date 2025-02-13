// Find the number of times each team won the toss and also won the match
const getAllTeamsWhoWonMatchAndToss = (matches) => {
  let teamsWonTossAndMatch = {};

  for (let { toss_winner, winner } of matches) {
    if (toss_winner == winner) {
      teamsWonTossAndMatch[winner] = (teamsWonTossAndMatch[winner] ?? 0) + 1;
    }
  }
  return teamsWonTossAndMatch;
};

export default getAllTeamsWhoWonMatchAndToss;
