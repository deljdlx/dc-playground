class Link {
  handles = [];

  startHandle;
  endHandle;

  constructor(board, x1, y1, x2, y2) {
    this.board = board;

    this.element = document.createElementNS("http://www.w3.org/2000/svg", "line");
    this.board.svg.appendChild(this.element);

    this.startHandle = new Handle(this, 'start', x1, y1);
    this.endHandle = new Handle(this, 'end', x2, y2);

    this.handles.push(this.startHandle);
    this.handles.push(this.endHandle);

    this.initializeEvents();
  }

  delete() {
    this.board.deleteLink(this);
    this.handles.forEach((handle) => {
      handle.delete();
    });
    this.element.remove();
  }

  initializeEvents() {

    console.log('%cLink.js :: 32 =============================', 'color: #f00; font-size: 1rem');
    console.log("ICI");

    this.element.addEventListener('contextmenu', (e) => {
      this.handleContextMenu(e);
    });

    this.element.addEventListener('dblclick', (e) => {
      this.handleDoubleClick(e);
    });
  }

  handleContextMenu(e) {
    e.preventDefault();
    this.delete();
  }

  getStartHandle() {
    return this.startHandle;
  }

  getEndHandle() {
    return this.endHandle;
  }

  getAngle() {
    return Math.atan2(this.getEndHandle().y - this.getStartHandle().y, this.getEndHandle().x - this.getStartHandle().x);
  }



  handleDoubleClick(e) {
    this.split(e);
  }

  split(e) {

    const x = e.clientX - this.board.getOffsets().x;
    const y = e.clientY - this.board.getOffsets().y;


    const newCircle = this.board.createCircle(x, y, 40, 'black');
    const newLink1 = this.board.createLink(this.circle1, newCircle);
    const newLink2 = this.board.createLink(newCircle, this.circle2);


    this.board.deleteLink(this);
    this.line.delete();

  }

  update() {

    this.element.setAttribute("x1", this.getStartHandle().x);
    this.element.setAttribute("y1", this.getStartHandle().y);
    this.element.setAttribute("x2", this.getEndHandle().x);
    this.element.setAttribute("y2", this.getEndHandle().y);
    this.element.setAttribute("stroke", "black");
    this.element.setAttribute("stroke-width", 10);
    this.element.setAttribute("stroke-linecap", "round");
    this.element.setAttribute("class", "line");
  }


  draw() {
    this.update();
    this.getStartHandle().draw();
    this.getEndHandle().draw();
  }
}