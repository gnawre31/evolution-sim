import React, { createRef, useContext, useReducer } from "react";
import simReducer from "./SimReducer";
import SimContext from "./simContext";

const creature = "CREATURE";
const food = "FOOD";

// generate a list of nodes and plot on a 2D plane
const generateNodes = (height, width) => {
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

const generateFood = (
  dispatch,
  height,
  width,
  nodes,
  duration = 2,
  amount = (height * width) / 50
) => {
  let count = 0;
  let x;
  let y;
  amount = Math.floor(Math.random() * amount + 1);
  while (count < amount) {
    x = Math.floor(Math.random() * width);
    y = Math.floor(Math.random() * height);
    if (nodes[x][y].occupied) {
      continue;
    }
    nodes[x][y].occupied = true;
    const newFood = {
      type: food,
      duration: Math.floor(Math.random() * (duration + 1) + 1),
    };
    nodes[x][y].current = newFood;
    count++;
  }
  dispatch({ type: "NEW_FOOD", payload: { nodes, count } });
};

const getCurrentCounts = (nodes) => {
  let foodCount = 0;
  let creatureCount = 0;
  nodes.forEach((row) => {
    row.forEach((n) => {
      if (n.occupied && n.current.type === food) {
        foodCount++;
      } else if (n.occupied && n.current.type === creature) {
        creatureCount++;
      }
    });
  });
  return { foodCount, creatureCount };
};

// access to context states
export const useSim = () => {
  const { state, dispatch } = useContext(SimContext);
  return [state, dispatch];
};

// starts new simulation
export const newSim = (dispatch, height, width) => {
  const nodes = generateNodes(height, width);
  dispatch({ type: "NEW_SIM", payload: { height, width, nodes } });
};

export const nextTurn = async (dispatch, state) => {
  await dispatch({ type: "NEXT_TURN" });
  generateFood(dispatch, state.height, state.width, state.nodes);

  let genCreature = Math.floor(Math.random() * 10);
  genCreature < 3 &&
    generateCreatures(dispatch, state.nodes, state.height, state.width);
  await dispatch({
    type: "UPDATE_CURRENT_COUNT",
    payload: getCurrentCounts(state.nodes),
  });
};

const generateCreatures = (
  dispatch,
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
      type: creature,
      duration: Math.floor(Math.random() * 3 + 8),
      vision: width / 5,
      attack: Math.floor(Math.random() * 3 + 8),
      aggression: Math.floor(Math.random() * 3 + 8),
      friendliness: Math.floor(Math.random() * 3 + 8),
      movement: 10,
      possibleActions: [],
    };
    // newCreature = scanMoves(newCreature)
    nodes[x][y].current = newCreature;
    nodes[x][y].occupied = true;
    count++;
  }
  dispatch({ type: "NEW_CREATURES", payload: { nodes, count } });
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
