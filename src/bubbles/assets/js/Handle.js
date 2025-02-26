class Handle {

  link;
  side;

  element;

  attachedCircle;

  constructor(link, side, x, y) {
    this.link = link;
    this.side = side;
    this.x = x;
    this.y = y;

    this.element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this.link.board.svg.appendChild(this.element);

    this.initializeEvents();
  }

  delete() {
    this.element.remove();
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.updateOffset();
    this.link.update();

  }

  getOppositeHandle() {
    if(this.side === 'start') {
      return this.link.getEndHandle();
    }
    else {
      return this.link.getStartHandle();
    }
  }


  initializeEvents() {
    this.element.addEventListener('mousedown', (e) => {
      this.handleMouseDown(e);
    });

    document.addEventListener('mouseup', (e) => {
      this.handleMouseup(e);

    });

    document.addEventListener('mousemove', (e) => {
      this.handleMouseMove(e);
    });
  }

  updateOffset() {
    const circle = this.attachedCircle;
    const angle = this.link.getAngle();
    const offsetX = Math.cos(angle) * circle.radius;
    const offsetY = Math.sin(angle) * circle.radius;

    if(this.side === 'start') {
      this.x = offsetX + circle.x;
      this.y = offsetY + circle.y;
    }
    else {
      this.x = circle.x - offsetX;
      this.y = circle.y - offsetY;
    }


    this.element.setAttribute("cx", this.x);
    this.element.setAttribute("cy", this.y);

  }

  attach(circle) {
    this.attachedCircle = circle;
    circle.attachHandle(this);

    this.updateOffset();
    this.link.update();
  }

  detach() {
    this.attachedCircle = null;
  }



  startDragging() {
    this.element.classList.add('dragging');
  }

  handleMouseDown(e) {
    this.element.classList.add('dragging');
  }

  handleMouseup(e) {

    if(this.element.classList.contains('dragging')) {
      this.element.classList.remove('dragging');

      const x = e.clientX - this.link.board.getOffsets().x;
      const y = e.clientY - this.link.board.getOffsets().y;

      const circle = this.link.board.getCircleAt(x, y);

      if(this.attachedCircle && this.attachedCircle !== circle) {
        this.attachedCircle.detachHandle(this);
      }

      if(circle) {
        this.attach(circle);
      }
      else {
        this.detach();
      }
    }
  }

  handleMouseMove(e) {
    if (this.element.classList.contains('dragging')) {

      this.x = e.clientX - this.link.board.getOffsets().x;
      this.y = e.clientY - this.link.board.getOffsets().y;

      this.element.setAttribute("cx", this.x);
      this.element.setAttribute("cy", this.y);

      if(this.getOppositeHandle().attachedCircle) {
        this.getOppositeHandle().updateOffset()
      }
      this.link.update();
    }
  }


  draw() {
    this.element.setAttribute("cx", this.x);
    this.element.setAttribute("cy", this.y);
    this.element.setAttribute("r", 10);
    this.element.setAttribute("fill", "white");
    this.element.setAttribute("stroke", "black");
    this.element.setAttribute("stroke-width", 2);
    this.element.setAttribute("class", "handle");
  }
}