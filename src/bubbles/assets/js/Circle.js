class Circle {
  container;

  group;
  element;

  handles = []

  text;
  txtElement;

  constructor(board, x, y, radius, color) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.group.setAttribute('x', this.x);
    this.group.setAttribute('y', this.y);


    // this.board.svg.appendChild(this.group);

    this.element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.board.svg.prepend(this.element);
    // this.group.appendChild(this.element);
    this.initializeEvents();

  }


  setText(text) {
    this.text = text;
    this.txtElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    this.txtElement.setAttribute('x', this.x);
    this.txtElement.setAttribute('y', this.y);
    this.txtElement.setAttribute('text-anchor', 'middle');
    this.txtElement.setAttribute('dominant-baseline', 'middle');
    this.txtElement.setAttribute('fill', 'white');
    this.txtElement.setAttribute('font-size', '1.5rem');
    this.txtElement.setAttribute('font-family', 'sans-serif');
    this.txtElement.setAttribute('font-weight', 'bold');
    this.txtElement.setAttribute('pointer-events', 'none');
    this.txtElement.innerHTML = this.text;
    this.board.svg.appendChild(this.txtElement);


  }



  delete() {
    this.handles.forEach((handle) => {
      handle.detach();
    });
    this.handles = [];
    this.element.remove();
  };


  attachHandle(handle) {
    this.handles.push(handle);
  }

  detachHandle(handle) {
    handle.detach();
    const index = this.handles.indexOf(handle);
    this.handles.splice(index, 1);
  }

  initializeEvents() {

    this.element.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.handleContextMenu(e);
    });

    this.element.addEventListener('mousedown', (e) => {
      this.handleMouseDown(e);
    });

    document.addEventListener('mouseup', (e) => {
      this.handleMouseUp(e);
    });

    document.addEventListener('mousemove', (e) => {
      this.handleMove(e);
    });
  }

  // ===========================

  handleContextMenu(e) {
    this.board.deleteCircle(this);
  }

  handleMouseDown(e) {

    if (e.ctrlKey) {
      this.element.classList.add('resizing');
    }
    else if (e.shiftKey) {
      this.element.classList.add('linking');
      const x = e.clientX - this.board.getOffsets().x;
      const y = e.clientY - this.board.getOffsets().y;

      const newLink = this.board.createLink(x, y, x+1, y+1);
      newLink.getStartHandle().attach(this);
      newLink.getEndHandle().startDragging();

    }
    else {
      this.element.classList.add('dragging');
    }
  }

  handleMouseUp(e) {
    this.element.classList.remove('dragging');
    this.element.classList.remove('resizing');
    this.element.classList.remove('linking');
  }

  handleMove(e) {
    if (this.element.classList.contains('dragging')) {
      this.x = e.clientX - this.board.getOffsets().x;
      this.y = e.clientY - this.board.getOffsets().y;
      this.element.setAttribute('cx', this.x);
      this.element.setAttribute('cy', this.y);
    }
    else if (this.element.classList.contains('resizing')) {
      this.handleResize(e);
    }

    this.handles.forEach((handle) => {
      handle.setPosition(this.x, this.y);
    });
  }

  handleResize(e) {
    const x = e.clientX - this.board.getOffsets().x;
    const y = e.clientY - this.board.getOffsets().y;
    const dx = x - this.x;
    const dy = y - this.y;
    this.radius = Math.sqrt(dx * dx + dy * dy);
    this.element.setAttribute('r', this.radius);
  }


  // ===========================

  draw() {

    this.element.setAttribute('cx', this.x);
    this.element.setAttribute('cy', this.y);
    this.element.setAttribute('r', this.radius);
    this.element.setAttribute('fill', this.color);
    this.element.setAttribute('class', 'circle');

  }
}