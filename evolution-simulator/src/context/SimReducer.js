const food = "FOOD";

const SimReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SIM":
      return {
        ...state,
        nodes: action.payload.nodes,
        height: action.payload.height,
        width: action.payload.width,
        food: {
          current: 0,
          total: 0,
        },
        creatures: {
          current: 0,
          total: 0,
        },
        running: true,
      };
    case "NEW_CREATURES":
      return {
        ...state,
        nodes: action.payload.nodes,
        creatures: {
          current: state.creatures.current + action.payload.count,
          total: state.creatures.total + action.payload.count,
        },
      };
    case "NEW_FOOD":
      return {
        ...state,
        nodes: action.payload.nodes,
        food: {
          current: state.food.current + action.payload.count,
          total: state.food.total + action.payload.count,
        },
      };
    case "NEXT_TURN":
      return {
        ...state,
        turn: state.turn + 1,
        nodes: state.nodes.map((row) => {
          return row.map((n) => {
            if (n.occupied && n.current != null) {
              let newNode = n;
              newNode.current.duration -= 1;
              if (newNode.current.duration < 1) {
                newNode.current = null;
                newNode.occupied = false;
              }
              return newNode;
            }
            return n;
          });
        }),
      };
    case "UPDATE_CURRENT_COUNT":
      return {
        ...state,
        food: {
          current: action.payload.foodCount,
          total: state.food.total,
        },
        creatures: {
          current: action.payload.creatureCount,
          total: state.creatures.total,
        },
      };

    default:
      return state;
  }
};

export default SimReducer;
