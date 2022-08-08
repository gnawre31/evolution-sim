// generate a list of nodes and plot on a 2D plane

import { randIntBetween } from "./calculation";

// each node contains x,y coordinates, occupied flag, and current object
export const generateNodes = (size) => {
  let nodes = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
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

export const generateFood = (state) => {
  let count = 0;

  const amount = Math.floor((Math.random() * state.size * state.size) / 50 + 1);

  while (count < amount) {
    const x = randIntBetween(0, state.size - 1);
    const y = randIntBetween(0, state.size - 1);
    if (state.nodes[x][y].occupied) {
      continue;
    }

    const newFood = {
      type: "FOOD",
      duration: randIntBetween(1, 3),
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
  let amount = Math.floor(state.size * state.size) / 100;
  while (count < amount) {
    const x = randIntBetween(0, state.size - 1);
    const y = randIntBetween(0, state.size - 1);
    if (state.nodes[x][y].occupied) {
      continue;
    }

    let newCreature = {
      type: "CREATURE",
      duration: randIntBetween(9, 12),
      vision: Math.floor(state.size / 5),
      attack: randIntBetween(9, 12),
      aggression: randIntBetween(9, 12),
      friendliness: randIntBetween(9, 12),
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
