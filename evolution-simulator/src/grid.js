export class Grid {
  height;
  width;
  nodes;
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.nodes = [];
    this.genNodes();
  }
  genNodes() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.nodes.push(new Node(i, j));
      }
    }
  }
}

export class Node {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
