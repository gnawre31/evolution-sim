// generate a list of nodes and plot on a 2D plane

import { scanMoves } from "./trackers";

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
  const x = Math.floor(Math.random() * state.width);
  const y = Math.floor(Math.random() * state.height);
  const amount = Math.floor(
    (Math.random() * state.height * state.width) / 50 + 1
  );
  while (count < amount) {
    if (state.nodes[x][y].occupied) {
      continue;
    }
    state.nodes[x][y].occupied = true;
    const newFood = {
      type: "FOOD",
      duration: Math.floor(Math.random() * (duration + 1) + 1),
    };
    state.nodes[x][y].current = newFood;
    state.food.foodNodes.push(state.nodes[x][y]);
    count++;
  }
  state.food.current += amount;
  state.food.total += amount;
  return { state };
};

export const generateCreatures = (
  nodes,
  height,
  width,
  amount = (height * width) / 75
) => {
  let count = 0;
  let x;
  let y;
  while (count < amount) {
    x = Math.floor(Math.random() * width);
    y = Math.floor(Math.random() * height);
    if (nodes[x][y].occupied) {
      continue;
    }

    let newCreature = {
      type: "CREATURE",
      duration: Math.floor(Math.random() * 3 + 8),
      vision: Math.floor(width / 5),
      attack: Math.floor(Math.random() * 3 + 8),
      aggression: Math.floor(Math.random() * 3 + 8),
      friendliness: Math.floor(Math.random() * 3 + 8),
      movement: 10,
      possibleActions: {},
    };
    nodes[x][y].current = newCreature;
    nodes[x][y].occupied = true;
    count++;
    nodes[x][y].current.possibleActions = scanMoves(nodes, nodes[x][y]);
  }
  return { nodes, count };
};
