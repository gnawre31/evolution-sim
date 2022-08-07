export const scanMoves = (nodes, creatureNode) => {
  const currX = creatureNode.x;
  const currY = creatureNode.y;
  let minX = currX - creatureNode.current.vision;
  let minY = currY - creatureNode.current.vision;
  let maxX = currX + creatureNode.current.vision;
  let maxY = currY + creatureNode.current.vision;
  minX = minX < 0 ? 0 : minX;
  minY = minY < 0 ? 0 : minY;
  maxX = maxX > nodes.length - 1 ? nodes.length - 1 : maxX;
  maxY = maxY > nodes.length - 1 ? nodes.length - 1 : maxY;
  let possibleNodes = [];
  let possibleFood = [];
  let possibleMate = [];
  let possibleAttack = [];

  for (let i = minX; i < maxX + 1; i++) {
    for (let j = minY; j < maxY + 1; j++) {
      if (i === currX && j === currY) {
        continue;
      }
      if (nodes[i][j].occupied) {
        if (
          nodes[i][j].current.type === "FOOD" &&
          nodes[i][j].current.duration > 1
        ) {
          possibleFood.push([i, j]);
        } else if (
          nodes[i][j].current.type === "CREATURE" &&
          nodes[i][j].current.duration > 1
        ) {
          possibleMate.push([i, j]);
        }
      }
      possibleNodes.push([i, j]);
    }
  }
  creatureNode.current.possibleActions = {
    possibleNodes,
    possibleFood,
    possibleMate,
    possibleAttack,
  };
  return creatureNode;
};
