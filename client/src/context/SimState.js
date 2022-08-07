import React, { useContext, useReducer } from "react";
import simReducer from "./SimReducer";
import SimContext from "./simContext";
import {
  generateCreatures,
  generateFood,
  generateNodes,
} from "../sim/generation";
import { getOccupiedNodes, scanMoves } from "../sim/trackers";
import { decreaseDuration } from "../sim/mechanics";

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
  state.turn += 1;
  state = decreaseDuration(state);

  // generate new food
  state = generateFood(state);

  // generate new creatures
  // 20% chance creature is generated by itself
  const genCreature = Math.floor(Math.random() * 10);
  if (genCreature < 2 || state.turn === 0) {
    state = generateCreatures(state);
    // await dispatch({ type: "NEW_CREATURES", payload: creaturePayload });
  }

  // scan moves for all creatures
  state = scanMoves(state);

  state = getOccupiedNodes(state);
  dispatch({ type: "UPDATE_ALL", payload: state });
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
      foodNodes: [],
    },
    creatures: {
      total: 0,
      current: 0,
      creatureNodes: [],
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
