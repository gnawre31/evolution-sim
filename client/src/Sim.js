import React, { useState } from "react";
import { useSim, newSim, nextTurn } from "./context/SimState";

const Sim = () => {
  const [simState, simDispatch] = useSim();
  const { running, turn, size, nodes, food, creatures } = simState;

  // generate new grid

  const newGrid = () => {
    newSim(simDispatch, 100);
  };

  const newTurn = () => {
    nextTurn(simDispatch, simState);
  };

  const extraGridStyling = running
    ? {
        gridTemplateColumns: `repeat(${size},1fr)`,
        gridTemplateRows: `repeat(${size},1fr)`,
      }
    : {};

  const nodeStyling = (node) => {
    if (!node.occupied) return "";
    if (node.current.type === "FOOD") {
      return "green";
    }
    if (node.current.type === "CREATURE") {
      return "red";
    }
  };

  return (
    <div className="container flex flex-col">
      <div onClick={newGrid}>New Grid</div>
      <div onClick={newTurn}>New Turn</div>
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
          nodes.map((row, idx) => (
            // <div key={idx}>{n.occupied && n.current.type[0]}</div>
            <div key={idx}>
              {row.map((node) => (
                <div
                  className="grid-item"
                  key={"" + node.x + node.y}
                  style={{
                    backgroundColor: nodeStyling(node),
                    height: "100%",
                    width: "100%",
                  }}
                >
                  {/* {node.occupied && "X:" + node.x + ", Y:" + node.y} */}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sim;
