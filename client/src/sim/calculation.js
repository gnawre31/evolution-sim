export const randIntBetween = (start, end) => {
  if (start !== end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
  }
  return start;
};

export const randInt = (target) => {
  return randIntBetween(minus10Pct(target), plus10Pct(target));
};

// 2 * LOG10( size^2 )^2 - 1
export const targetFoodGen = (size) => {
  return Math.floor(2 * Math.pow(Math.log10(Math.pow(size, 2)), 2)) - 1;
};

// (size^2) ^ (0.2) - 1
export const targetCreatureGen = (size) => {
  return Math.floor(Math.pow(Math.pow(size, 2), 0.2)) - 1;
};

const plus10Pct = (target) => {
  return Math.round(target * 1.1);
};

const minus10Pct = (target) => {
  return Math.round(target * 0.9);
};
