import mapObject from "./mapObject";

const node = "NODE";

export default class Node extends mapObject {
  currEl = null;
  constructor(x, y) {
    super(x, y, node);
  }
}
