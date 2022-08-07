export const scanMoves = (state) => {
  state.creatures.creatureNodes.map((c) => {
    let minX = c.x - c.current.vision;
    let minY = c.y - c.current.vision;
    let maxX = c.x + c.current.vision;
    let maxY = c.y + c.current.vision;
    minX = minX < 0 ? 0 : minX;
    minY = minY < 0 ? 0 : minY;
    maxX = maxX > state.width - 1 ? state.width - 1 : maxX;
    maxY = maxY > state.height - 1 ? state.height - 1 : maxY;
    let possibleNodes = [];
    let possibleFood = [];
    let possibleMate = [];
    let possibleAttack = [];
    for (let i = minX; i < maxX + 1; i++) {
      for (let j = minY; j < maxY + 1; j++) {
        if (i === c.x && j === c.y) {
          continue;
        }
        if (state.nodes[i][j].occupied) {
          if (state.nodes[i][j].current.type === "FOOD") {
            possibleFood.push([i, j]);
          } else if (state.nodes[i][j].current.type === "CREATURE") {
            possibleMate.push([i, j]);
          }
        }
        possibleNodes.push([i, j]);
      }
    }
    state.nodes[c.x][c.y].current.possibleActions = {
      possibleNodes,
      possibleFood,
      possibleMate,
      possibleAttack,
    };
    c.current.possibleActions = state.nodes[c.x][c.y].current.possibleActions;
    return c;
  });
  return state;
};

export const getOccupiedNodes = (state) => {
  state.food.foodNodes = [];
  state.creatures.creatureNodes = [];
  state.nodes.forEach((row) => {
    row.forEach((n) => {
      if (n.occupied && n.current != null) {
        if (n.current.type === "FOOD") {
          state.food.foodNodes.push(n);
        } else if (n.current.type === "CREATURE") {
          state.creatures.creatureNodes.push(n);
        }
      }
    });
  });
  return state;
};
