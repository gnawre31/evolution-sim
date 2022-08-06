import mapObject from "./mapObject";

const node = "NODE";
const food = "FOOD";

export default class Node extends mapObject {
  currEl = null;
  turn = 0;
  constructor(x, y) {
    super(x, y, node);
  }

  advanceTurn() {
    this.turn++;
    if (this.currEl != null) {
      if (this.currEl.type === food) {
        let food = this.currEl;
        food.decreaseTime();
        if (food.timeRemaining < 1) {
          this.currEl = null;
        }
      }
    }
  }
}
