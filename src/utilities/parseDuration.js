function parseDuration(durationString) {
  const unitMap = {
    ms: 1,
    s: 1000,
    m: 60000,
    h: 3600000,
    d: 86400000,
    w: 604800000,
    M: 2592000000,
    y: 31536000000,
  };

  const regex = /^(\d+)([smhdwMy])$/;
  const matches = durationString.match(regex);

  if (!matches) {
    throw new Error('Invalid duration string');
  }

  const value = parseInt(matches[1]);
  const unit = matches[2];

  if (!unitMap[unit]) {
    throw new Error('Invalid unit in duration string');
  }

  return value * unitMap[unit];
}

export default parseDuration;
