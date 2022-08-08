const SimReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SIM":
      return {
        ...state,
        nodes: action.payload.nodes,
        size: action.payload.size,
        food: {
          current: 0,
          total: 0,
          foodNodes: [],
        },
        creatures: {
          current: 0,
          total: 0,
          creatureNodes: [],
        },
        turn: 0,
        running: true,
      };
    case "UPDATE_ALL":
      return { ...state };

    default:
      return state;
  }
};

export default SimReducer;
