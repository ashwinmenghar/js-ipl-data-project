// Find the bowler with the best economy in super overs

const filterSuperOverDeliveries = (deliveries) =>
  deliveries.filter(({ is_super_over }) => is_super_over == 1);

const calculateBowlerStats = (superOverDeliveries) => {
  return superOverDeliveries.reduce(
    (bowlersList, { bowler, wide_runs, noball_runs, batsman_runs }) => {
      if (!bowlersList[bowler]) {
        bowlersList[bowler] = {
          totalRunsInSuperOver: 0,
          totalBallsInSuperOver: 0,
        };
      }

      bowlersList[bowler].totalRunsInSuperOver +=
        Number(wide_runs) + Number(noball_runs) + Number(batsman_runs);

      if (wide_runs == 0 && noball_runs == 0) {
        bowlersList[bowler].totalBallsInSuperOver++;
      }

      return bowlersList;
    },
    {}
  );
};

const findBestEconomyBowler = (bowlersList) => {
  return Object.entries(bowlersList).reduce(
    (best, [bowler, { totalRunsInSuperOver, totalBallsInSuperOver }]) => {
      let totalOvers = totalBallsInSuperOver / 6;
      let economy = Number.MAX_SAFE_INTEGER;

      if (totalOvers > 0) {
        economy = totalRunsInSuperOver / totalOvers;
      }

      if (economy < best.economy) {
        return { bowlerName: bowler, economy };
      } else {
        return best;
      }
    },
    { bowlerName: "", economy: Number.MAX_SAFE_INTEGER }
  );
};

export const getBestEconomyBowlerInSuperOvers = (deliveries) => {
  const superOverDeliveries = filterSuperOverDeliveries(deliveries);
  const bowlersList = calculateBowlerStats(superOverDeliveries);
  return findBestEconomyBowler(bowlersList);
};
