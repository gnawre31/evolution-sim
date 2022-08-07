import React, { useContext, useReducer } from "react";
import simReducer from "./SimReducer";
import SimContext from "./simContext";
import {
  generateCreatures,
  generateFood,
  generateNodes,
} from "../sim/generation";
import { getCurrentCounts, scanMoves } from "../sim/trackers";
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
  let newState = state;
  // newState = decreaseDuration(newState);
  // next turn
  // await dispatch({ type: "NEXT_TURN" });

  // generate new food
  const foodPayload = generateFood(state);
  await dispatch({
    type: "NEW_FOOD",
    payload: foodPayload.state,
  });

  // // generate new creatures
  // //30% chance creature is generated by itself
  // let genCreature = Math.floor(Math.random() * 10);

  // if (genCreature < 3) {
  //   let creaturePayload = generateCreatures(
  //     state.nodes,
  //     state.height,
  //     state.width
  //   );
  //   await dispatch({ type: "NEW_CREATURES", payload: creaturePayload });
  // }

  // //update counters
  // await dispatch({
  //   type: "UPDATE_CURRENT_COUNT",
  //   payload: getCurrentCounts(state.nodes),
  // });

  // // getCurrentCounts --> scan and get possible moves
  // state.creatures.creatureNodes.length > 0 &&
  //   state.creatures.creatureNodes.forEach((n) => {
  //     const possibleActions = scanMoves(state.nodes, n);
  //     console.log(possibleActions);
  //     dispatch({
  //       type: "UPDATE_POSSIBLE_ACTIONS",
  //       payload: { x: n.x, y: n.y, possibleActions: possibleActions },
  //     });
  //   });
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
