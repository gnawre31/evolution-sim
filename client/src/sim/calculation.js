export const randIntBetween = (start, end) => {
  return Math.floor(Math.random() * (end - start + 1) + start);
};

export const randInt = (target) => {
  return randIntBetween(minus10Pct(target), plus10Pct(target));
};

//3 * LOG10( size^2 )^2 - 2
export const targetFoodGen = (size) => {
  return Math.floor(3 * Math.pow(Math.log(Math.pow(size, 2)), 2)) - 2;
};

// (size^2) ^ (0.25) - 1
export const targetCreatureGen = (size) => {
  return Math.floor(Math.pow(Math.pow(size, 2), 1 / 4)) - 1;
};

const plus10Pct = (target) => {
  return Math.round(target * 1.1);
};

const minus10Pct = (target) => {
  return Math.round(target * 0.9);
};
