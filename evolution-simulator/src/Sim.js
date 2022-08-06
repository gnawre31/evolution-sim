import React, { useState } from "react";
import {
  usePack,
  newSim,
  generateFood,
  nextTurn,
  generateCreatures,
} from "./context/SimState";

const Sim = () => {
  const [simState, simDispatch] = usePack();
  const { running, turn, height, width, nodes, food, creatures } = simState;

  // generate new grid

  const newGrid = () => {
    newSim(simDispatch, 10, 10);
  };

  const newFood = () => {
    generateFood(simDispatch, height, width, nodes);
  };
  const newTurn = () => {
    nextTurn(simDispatch, nodes);
  };

  const newCreature = () => {
    generateCreatures(simDispatch, nodes);
  };

  const extraGridStyling = running
    ? {
        gridTemplateColumns: `repeat(${width},1fr)`,
        gridTemplateRows: `repeat(${height},1fr)`,
      }
    : {};

  return (
    <div className="container flex flex-col">
      <div onClick={newGrid}>New Grid</div>
      <div onClick={newFood}>New Food</div>
      <div onClick={newTurn}>New Turn</div>
      <div onClick={newCreature}>New Creatures</div>
      <div>
        {food.current} / {food.total} food
      </div>
      <div>
        {creatures.current} / {creatures.total} creatures
      </div>
      <div className="flex flex-row"></div>

      <div
        className={`align-items ${running ? "grid" : ""} `}
        style={extraGridStyling}
      >
        {running &&
          nodes.map((n, idx) => (
            <div key={idx}>{n.occupied && n.current.type}</div>
          ))}
      </div>
    </div>
  );
};

export default Sim;
