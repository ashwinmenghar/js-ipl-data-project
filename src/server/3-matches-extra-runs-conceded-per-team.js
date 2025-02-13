import { getMatchesId } from "./helper.js";

const getExtraRunsByTeamInaSeason = (matches, deliveries, season) => {
  const matchIds = getMatchesId(matches, season);
  let extraRunsByTeam = {};

  for (let delivery of deliveries) {
    if (matchIds.has(delivery.match_id)) {
      const team = delivery.bowling_team;
      const extraRuns = Number(delivery.extra_runs) || 0;

      extraRunsByTeam[team] = (extraRunsByTeam[team] || 0) + extraRuns;
    }
  }

  return extraRunsByTeam;
};

export default getExtraRunsByTeamInaSeason;
