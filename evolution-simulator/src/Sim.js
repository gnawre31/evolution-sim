import React, { useState } from "react";
import Grid from "./grid";

const Sim = () => {
  const [grid, setGrid] = useState(null);
  const newGrid = () => {
    const grid = new Grid(10, 10);
    setGrid(grid);
  };

  const extraGridStyling =
    grid != null
      ? {
          gridTemplateColumns: `repeat(${grid.width},1fr)`,
          gridTemplateRows: `repeat(${grid.height},1fr)`,
        }
      : {};

  return (
    <div className="container flex flex-col">
      <div onClick={newGrid}>New Grid</div>
      <div className="flex flex-row">
        {/* <div>x:{grid && grid.width}, </div> */}
        {/* <div>y: {grid && grid.height}</div> */}
      </div>

      <div
        className={`align-items ${grid != null ? "grid" : ""} `}
        style={extraGridStyling}
      >
        {grid != null &&
          grid.nodes.map((n, idx) => (
            <div key={idx}>{n.currEl && n.currEl.type}</div>
          ))}
      </div>
    </div>
  );
};

export default Sim;
