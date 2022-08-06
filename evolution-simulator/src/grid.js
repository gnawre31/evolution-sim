import Food from "./food";
import Node from "./node";

export default class Grid {
  height;
  width;
  turn = 0;
  nodes = [];
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.generateNodes();
    this.generateFood(3);
  }

  // generates height x width number of nodes and stores in this.nodes array
  generateNodes() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.nodes.push(new Node(i, j));
      }
    }
  }

  // generates x number of food objects on empty nodes
  generateFood(x = 10) {
    var count = 0;
    var nodeIndex;
    var randomNode;
    while (count < x) {
      nodeIndex = Math.floor(Math.random() * this.height * this.width);
      randomNode = this.nodes[nodeIndex];
      if (randomNode.currEl != null) {
        continue;
      }
      randomNode.currEl = new Food(randomNode.x, randomNode.y);
      count++;
    }
  }

  nextTurn() {
    this.turn++;
    this.nodes.forEach((n) => n.advanceTurn());
    console.log(this.turn);

    // return this;
  }
}
