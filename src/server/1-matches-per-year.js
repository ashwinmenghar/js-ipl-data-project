const getNumberOfMatchesPlayed = (matches) => {
  let matchFreq = {};

  for (let match of matches) {
    if (matchFreq[match.season] === undefined) matchFreq[match.season] = 1;
    else matchFreq[match.season]++;
  }
  return matchFreq;
};

export default getNumberOfMatchesPlayed;
