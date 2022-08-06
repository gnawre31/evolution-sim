import React from "react";
import { Grid, Node } from "./grid";

const Sim = () => {
  const grid = new Grid(10, 3);

  const extraGridStyling = {
    gridTemplateColumns: `repeat(${grid.width},1fr)`,
    gridTemplateRows: `repeat(${grid.height},1fr)`,
  };

  return (
    <div className="container flex flex-col">
      <div className="flex flex-row">
        <div>x:{grid.width}, </div>
        <div>y: {grid.height}</div>
      </div>

      <div className="grid align-items" style={extraGridStyling}>
        {grid.nodes.map((n, idx) => (
          <div>
            {n.x},{n.y}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sim;
