export const decreaseDuration = (state) => {
  let toDelete = [];

  // decrease duration of food by 1
  state.food.foodNodes.map((f) => {
    // minus 1 duration in Node map
    state.nodes[f.x][f.y].current.duration -= 1;

    // if duration < 1, add coordinates to list of elements to delete
    if (f.current.duration < 1) {
      toDelete.push({ x: f.x, y: f.y, type: f.current.type });
    }
    return f;
  });

  // decrease duration of creatures by 1
  state.creatures.creatureNodes.map((c) => {
    // minus 1 duration in Node map
    state.nodes[c.x][c.y].current.duration -= 1;

    // if duration < 1, add coordinates to list of elements to delete
    if (c.current.duration < 1) {
      toDelete.push({ x: c.x, y: c.y, type: c.current.type });
    }
    return c;
  });

  // DELETE
  toDelete.forEach((item) => {
    const { x, y, type } = item;
    if (type === "FOOD") {
      let index = state.food.foodNodes.indexOf(state.nodes[x][y]);
      state.nodes[x][y].occupied = false;
      state.nodes[x][y].current = null;
      state.food.current -= 1;
      state.food.foodNodes.splice(index, 1);
    } else if (type === "CREATURE") {
      let index = state.creatures.creatureNodes.indexOf(state.nodes[x][y]);
      state.nodes[x][y].occupied = false;
      state.nodes[x][y].current = null;
      state.creatures.current -= 1;
      state.creatures.creatureNodes.splice(index, 1);
    }
  });

  return state;
};
