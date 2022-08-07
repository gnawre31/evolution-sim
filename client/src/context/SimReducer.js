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
          foodNodes: [],
        },
        creatures: {
          current: 0,
          total: 0,
          creatureNodes: [],
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
          foodNodes: action.payload.foodNodes,
        },
        creatures: {
          current: action.payload.creatureCount,
          total: state.creatures.total,
          creatureNodes: action.payload.creatureNodes,
        },
      };
    case "UPDATE_POSSIBLE_ACTIONS":
      return {
        ...state,
        nodes: state.nodes.map((row) => {
          const { x, y, possibleActions } = action.payload;
          return row.map((n) => {
            if (n.occupied && n.x === x && n.y === y) {
              n.current.possibleActions = possibleActions;
            }
            return n;
          });
        }),
      };

    default:
      return state;
  }
};

export default SimReducer;
