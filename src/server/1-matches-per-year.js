const getNumberOfMatchesPlayed = (matches) => {
  return matches.reduce((matchFreq, curr) => {
    if (matchFreq[curr.season] === undefined) matchFreq[curr.season] = 1;
    else matchFreq[curr.season]++;
    return matchFreq;
  }, {});
};

export default getNumberOfMatchesPlayed;
