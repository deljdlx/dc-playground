class Grid
{
  columns;
  rows;
  hexRadius;
  hexWidth;
  hexHeight;
  offset1;
  offset2;

  grid = [];

  constructor(columns, rows, hexRadius) {
    this.columns = columns;
    this.rows = rows;
    this.hexRadius = hexRadius;

    this.hexWidth = Math.sqrt(3) * this.hexRadius;
    this.hexHeight = 2 * this.hexRadius;

    this.offset1 = this.hexRadius * 0.234;
    this.offset2 = this.hexRadius * 0.111;

    for (let col = 0; col < this.columns; col++) {
      this.grid[col] = [];
      for (let row = 0; row < this.rows; row++) {
        this.grid[col][row] = null;
      }
    }
  }

  getCell(col, row) {
    return this.grid[col][row];
  }

  render() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('class', 'hex-grid-container');
    svg.setAttribute('width', this.columns * 1.5 * (this.hexRadius + 1) + this.hexRadius);
    svg.setAttribute('height', this.rows * (this.hexHeight - this.offset1) + this.hexRadius);

    for (let col = 0; col < this.columns; col++) {
      for (let row = 0; row < this.rows; row++) {
          const hexagon = new Hexagon(this, col, row, this.hexRadius);
          svg.appendChild(hexagon.render());

          this.grid[col][row] = hexagon;
      }
    }
    return svg;
  }
}
