import React, { createRef, useContext, useReducer } from "react";
import simReducer from "./SimReducer";
import SimContext from "./simContext";

const creature = "CREATURE";
const food = "FOOD";

// generate a list of nodes and plot on a 2D plane
const generateNodes = (height, width) => {
  let nodes = [];
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      nodes.push({
        x: i,
        y: j,
        occupied: false,
        current: null,
      });
    }
  }
  return nodes;
};

export const generateFood = (
  dispatch,
  height,
  width,
  nodes,
  duration = 2,
  amount = (height * width) / 50
) => {
  let count = 0;
  let nodeIndex;
  while (count < amount) {
    nodeIndex = Math.floor(Math.random() * height * width);
    if (nodes[nodeIndex].occupied) {
      continue;
    }
    nodes[nodeIndex].occupied = true;
    const newFood = {
      type: food,
      duration: Math.floor(Math.random() * (duration + 1) + 1),
    };
    nodes[nodeIndex].current = newFood;
    count++;
  }
  dispatch({ type: "NEW_FOOD", payload: { nodes, count } });
};

const getCurrentCounts = (nodes) => {
  let foodCount = 0;
  let creatureCount = 0;
  nodes
    .filter((n) => n.occupied)
    .forEach((n) => {
      if (n.current.type === food) {
        foodCount++;
      } else if (n.current.type === creature) {
        creatureCount++;
      }
    });
  return { foodCount, creatureCount };
};

// access to context states
export const usePack = () => {
  const { state, dispatch } = useContext(SimContext);
  return [state, dispatch];
};

// starts new simulation
export const newSim = (dispatch, height, width) => {
  const nodes = generateNodes(height, width);
  dispatch({ type: "NEW_SIM", payload: { height, width, nodes } });
};

export const nextTurn = async (dispatch, nodes) => {
  await dispatch({ type: "NEXT_TURN" });
  dispatch({ type: "UPDATE_CURRENT_COUNT", payload: getCurrentCounts(nodes) });
};

export const generateCreatures = (
  dispatch,
  nodes,
  amount = nodes.length / 75
) => {
  let count = 0;
  let nodeIndex;
  while (count < amount) {
    nodeIndex = Math.floor(Math.random() * nodes.length);
    if (nodes[nodeIndex].occupied) {
      continue;
    }
    const newCreature = {
      type: creature,
      duration: Math.floor(Math.random() * 3 + 8),
      vision: Math.floor(Math.random() * 2 + 2),
      attack: Math.floor(Math.random() * 3 + 8),
      aggression: Math.floor(Math.random() * 3 + 8),
      friendliness: Math.floor(Math.random() * 3 + 8),
      movement: 10,
      gender: Math.round(Math.random()),
    };
    nodes[nodeIndex].current = newCreature;
    nodes[nodeIndex].occupied = true;
    count++;
  }
  //   console.log(nodes);
  dispatch({ type: "NEW_CREATURES", payload: { nodes, count } });

  //   return nodes;
};

const SimState = (props) => {
  const initialState = {
    running: false,
    turn: 0,
    height: 0,
    width: 0,
    nodes: [],
    food: {
      total: 0,
      current: 0,
    },
    creatures: {
      total: 0,
      current: 0,
    },
  };
  const [state, dispatch] = useReducer(simReducer, initialState);

  return (
    <SimContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </SimContext.Provider>
  );
};

export default SimState;
