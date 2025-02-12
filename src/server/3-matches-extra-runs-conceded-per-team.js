const getMatchesId = (matches, season) => {
  return new Set(
    matches.filter((match) => match.season == season).map((match) => match.id)
  );
};

const getExtraRunsByTeamInaSeason = (matches, deliveries, season) => {
  const matchIds = getMatchesId(matches, season);

  return deliveries.reduce((acc, delivery) => {
    if (matchIds.has(String(delivery.match_id))) {
      const team = delivery.bowling_team;
      const extraRuns = Number(delivery.extra_runs) || 0;

      acc[team] = (acc[team] || 0) + extraRuns;
    }
    return acc;
  }, {});
};

export default getExtraRunsByTeamInaSeason;
