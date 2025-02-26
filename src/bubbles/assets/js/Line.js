class Line {
  container;
  element;

  x1;
  y1;
  x2;
  y2;
  color;


  constructor(board, x1, y1, x2, y2, color) {
    this.board = board;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;

    this.element = document.createElementNS("http://www.w3.org/2000/svg", "line");
    this.board.svg.appendChild(this.element);
  }

  setStart(x, y) {
    this.x1 = x;
    this.y1 = y;
    this.draw();
  }

  setEnd(x, y) {
    this.x2 = x;
    this.y2 = y;
    this.draw();
  }


  delete() {
    this.element.remove();
  }

  draw() {
    this.element.setAttribute("x1", this.x1);
    this.element.setAttribute("y1", this.y1);
    this.element.setAttribute("x2", this.x2);
    this.element.setAttribute("y2", this.y2);
    this.element.setAttribute("stroke", this.color);
    this.element.setAttribute("stroke-width", 10);
    this.element.setAttribute("stroke-linecap", "round");
    this.element.setAttribute("class", "line");
  }
}

