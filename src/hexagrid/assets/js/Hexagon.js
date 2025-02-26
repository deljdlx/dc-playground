class Hexagon
{
  col;
  row;
  x;
  y;
  radius;
  content;

  grid;

  constructor(grid, col, row, radius, content = null) {
    this.grid = grid;

    this.col = col;
    this.row = row;
    this.radius = radius;

    this.hexWidth = Math.sqrt(3) * this.radius;
    this.hexHeight = 2 * this.radius;


    this.offset1 = this.radius * 0.234;
    this.offset2 = this.radius * 0.111;


    this.x = col * 1.5 * (this.radius + 1) + this.radius;
    this.y = row * (this.hexHeight - this.offset1) + (col % 2) * ((this.hexHeight) / 2 - this.offset2) + this.radius;

    if(content === null) {
      this.content = this.col + ',' + this.row;
    }
  }

  get x() {
    return this.x;
  }

  get y() {
    return this.y;
  }

  get radius() {
    return this.radius;
  }

  getTopLeft() {

  }

  render() {

    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute('class', 'hex-group');

    const hexagon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

    const points = [];
    for (let i = 0; i < 6; i++) {
        const angle = 2 * Math.PI / 6 * i;
        const pointX = this.x + this.radius * Math.cos(angle);
        const pointY = this.y + this.radius * Math.sin(angle);
        points.push(`${pointX},${pointY}`);
    }

    hexagon.setAttribute('points', points.join(' '));
    hexagon.classList.add('hex');

    group.appendChild(hexagon);
    group.addEventListener('click', () => {
        console.log(
          this.col,
          this.row,
        );
    });



    // // create a div inside the foreignObject using xmlns http://www.w3.org/1999/xhtml
    const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    foreignObject.setAttribute('z-index', 1000);

    const body = document.createElementNS("http://www.w3.org/1999/xhtml", "body");
    body.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');

    const content = document.createElement('div');
    content.classList.add('hex-content');
    body.appendChild(content);

    content.innerHTML = this.content;
    content.style.width = this.radius * 1.7 + 'px';
    content.style.height = this.radius * 1.7 + 'px';

    foreignObject.appendChild(body);
    foreignObject.setAttribute('x', this.x - this.radius * 0.86);
    foreignObject.setAttribute('y', this.y - this.radius * 0.86);
    foreignObject.setAttribute('width', this.radius * 2);
    foreignObject.setAttribute('height', this.radius * 2);

    group.appendChild(foreignObject);




    hexagon.addEventListener('click', function() {
        console.log('clicked');
    });

    return group;
  }
}