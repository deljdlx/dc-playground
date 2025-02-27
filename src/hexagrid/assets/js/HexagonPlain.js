class HexagonPlain
{
  _col;
  row;
  _x;
  _y;
  _radius;
  _content;
  _grid;

  constructor(grid, col, row, radius, content = null) {
    this._grid = grid;

    this._col = col;
    this._row = row;
    this._radius = radius;

    this.hexWidth = Math.sqrt(3) * this._radius;
    this.hexHeight = 2 * this._radius;


    this.offset1 = this._radius * 0.234;
    this.offset2 = this._radius * 0.111;


    this._x = col * 1.5 * (this._radius + 1) + this._radius;
    this._y = row * (this.hexHeight - this.offset1) + (col % 2) * ((this.hexHeight) / 2 - this.offset2) + this._radius;

    if(content === null) {
      this._content = this._col + ',' + this._row;
    }
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get radius() {
    return this._radius;
  }

  render() {

    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute('class', 'hex-group');

    const hexagon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

    const points = [];
    for (let i = 0; i < 6; i++) {
        const angle = 2 * Math.PI / 6 * i;
        const pointX = this._x + this._radius * Math.cos(angle);
        const pointY = this._y + this._radius * Math.sin(angle);
        points.push(`${pointX},${pointY}`);
    }

    hexagon.setAttribute('points', points.join(' '));
    hexagon.classList.add('hex');

    group.appendChild(hexagon);
    group.addEventListener('click', () => {
        console.log(
          this._col,
          this._row,
        );
    });

    // create a div inside the foreignObject using xmlns http://www.w3.org/1999/xhtml
    const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    foreignObject.setAttribute('z-index', 1000);

    const body = document.createElementNS("http://www.w3.org/1999/xhtml", "body");
    body.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');

    const content = document.createElement('div');
    content.classList.add('hex-content');
    body.appendChild(content);

    content.innerHTML = this._content;
    content.style.width = this._radius * 1.7 + 'px';
    content.style.height = this._radius * 1.7 + 'px';

    foreignObject.appendChild(body);
    foreignObject.setAttribute('x', this._x - this._radius * 0.86);
    foreignObject.setAttribute('y', this._y - this._radius * 0.86);
    foreignObject.setAttribute('width', this._radius * 2);
    foreignObject.setAttribute('height', this._radius * 2);

    group.appendChild(foreignObject);

    hexagon.addEventListener('click', function() {
        console.log('clicked');
    });

    return group;
  }
}