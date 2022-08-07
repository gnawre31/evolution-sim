// generate a list of nodes and plot on a 2D plane
// each node contains x,y coordinates, occupied flag, and current object
export const generateNodes = (height, width) => {
  let nodes = [];
  for (let i = 0; i < width; i++) {
    let row = [];
    for (let j = 0; j < height; j++) {
      row.push({
        x: i,
        y: j,
        occupied: false,
        current: null,
      });
    }
    nodes.push(row);
  }
  return nodes;
};

export const generateFood = (state, duration = 2) => {
  let count = 0;

  const amount = Math.floor(
    (Math.random() * state.height * state.width) / 50 + 1
  );

  while (count < amount) {
    const x = Math.floor(Math.random() * state.width);
    const y = Math.floor(Math.random() * state.height);
    if (state.nodes[x][y].occupied) {
      continue;
    }

    const newFood = {
      type: "FOOD",
      duration: Math.floor(Math.random() * (duration + 1) + 1),
    };
    state.nodes[x][y].occupied = true;
    state.nodes[x][y].current = newFood;
    state.food.foodNodes.push(state.nodes[x][y]);
    count++;
  }
  state.food.current += count;
  state.food.total += count;
  return state;
};

export const generateCreatures = (state) => {
  let count = 0;
  let amount = (state.height * state.width) / 75;
  while (count < amount) {
    const x = Math.floor(Math.random() * state.width);
    const y = Math.floor(Math.random() * state.height);
    if (state.nodes[x][y].occupied) {
      continue;
    }

    let newCreature = {
      type: "CREATURE",
      duration: Math.floor(Math.random() * 3 + 8),
      vision: Math.floor(state.width / 5),
      attack: Math.floor(Math.random() * 3 + 8),
      aggression: Math.floor(Math.random() * 3 + 8),
      friendliness: Math.floor(Math.random() * 3 + 8),
      movement: 10,
      possibleActions: {},
    };
    state.nodes[x][y].occupied = true;
    state.nodes[x][y].current = newCreature;
    state.creatures.creatureNodes.push(state.nodes[x][y]);
    count++;
  }
  state.creatures.current += count;
  state.creatures.total += count;
  return state;
};
