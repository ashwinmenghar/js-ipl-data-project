// Find the bowler with the best economy in super overs
const filterSuperOverDeliveries = (deliveries) => {
  let deliveriesArr = [];
  for (const delivery of deliveries) {
    if (delivery.is_super_over == 1) {
      deliveriesArr.push(delivery);
    }
  }
  return deliveriesArr;
};

const calculateBowlerStats = (superOverDeliveries) => {
  let bowlersList = {};

  for (const {
    bowler,
    wide_runs,
    noball_runs,
    batsman_runs,
  } of superOverDeliveries) {
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
  }
  return bowlersList;
};

const findBestEconomyBowler = (bowlersList) => {
  let bestBowler = { bowlerName: "", economy: Number.MAX_SAFE_INTEGER };

  for (let [
    bowler,
    { totalRunsInSuperOver, totalBallsInSuperOver },
  ] of Object.entries(bowlersList)) {
    let totalOvers = totalBallsInSuperOver / 6;
    let economy = Number.MAX_SAFE_INTEGER;

    if (totalOvers > 0) {
      economy = totalRunsInSuperOver / totalOvers;
    }

    if (economy < bestBowler.economy) {
      bestBowler = { bowlerName: bowler, economy };
    }
  }

  return bestBowler;
};

export const getBestEconomyBowlerInSuperOvers = (deliveries) => {
  const superOverDeliveries = filterSuperOverDeliveries(deliveries);
  const bowlersList = calculateBowlerStats(superOverDeliveries);

  return findBestEconomyBowler(bowlersList);
};
