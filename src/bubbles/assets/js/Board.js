class Board {

  container;
  svg;

  constructor(selector) {

    this.container = document.querySelector(selector);
    this.createSvgContainer();
    this.initilizeEvents();

    this.circles = [];
    this.links = [];
  }

  addCircle(circle) {
    this.circles.push(circle);
  }

  createCircle(x, y, radius, color) {
    const circle = new Circle(this, x, y, radius, color);
    this.addCircle(circle);
    circle.draw();
    return circle;
  }

  createLink(x1, y1, x2, y2) {
    const link = new Link(this, x1, y1, x2, y2);
    this.addLink(link);
    link.draw();
    return link;
  }

  deleteLink(link) {
    const index = this.links.indexOf(link);
    this.links.splice(index, 1);
  }

  deleteCircle(circle) {
    const index = this.circles.indexOf(circle);
    this.circles.splice(index, 1);
    circle.delete();
  }

  getOffsets() {
    const rect = this.svg.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.top,
    };
  }

  getCircleAt(x, y) {
    return this.circles.find((circle) => {
      if(Math.abs(circle.x - x) < circle.radius && Math.abs(circle.y - y) < circle.radius) {
        return true;
      }
      return false;
    });

  }


  addLink(link) {
    this.links.push(link);
  }

  initilizeEvents() {
    this.svg.addEventListener('dblclick', (e) => {
      const radius = 50;
      const x = e.clientX - this.getOffsets().x;
      const y = e.clientY - this.getOffsets().y;

      const circle = this.createCircle(x, y, radius, 'red');
      circle.draw();
    });
  }

  createSvgContainer() {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('width', '100%');
    this.svg.setAttribute('height', '100%');
    this.svg.setAttribute('class', 'svg-container');
    this.container.appendChild(this.svg);
  }

  draw() {
    this.circles.forEach((circle) => {
      circle.draw();
    });

    this.links.forEach((link) => {
      link.draw();
    });
  }
}
