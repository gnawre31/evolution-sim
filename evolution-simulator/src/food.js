import mapObject from "./mapObject";

const food = "FOOD";

export default class Food extends mapObject {
  timeRemaining;
  constructor(x, y, timeRemaining = 2) {
    super(x, y, food);
    this.timeRemaining = timeRemaining;
  }
  decreaseTime() {
    this.timeRemaining--;
  }
}
