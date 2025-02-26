class Matrix
{

  cells = [];

  open = [];
  closed = [];

  cellSize = 20;

  /** @param {MatrixRenderer} matrixRenderer */
  renderer;


  constructor(rows, cols, cellSize) {
    this.rows = rows;
    this.cols = cols;
    this.cellSize = cellSize;


    for(let row = 0; row < rows; row++) {
      this.cells[row] = [];
      for(let col = 0; col < cols; col++) {
        this.cells[row][col] = new Cell(row, col, 0);
      }
    }

    this.renderer = new MatrixRenderer(this, cellSize);
  }



  findPath(startRow, startCol, endRow, endCol) {
    this.open = [];
    this.closed = [];

    let currentStep = new PathStep(startRow, startCol, null);

    this.open.push(currentStep);
    this.closed.push(`${startRow}-${startCol}`);

    const neighbors = {
      left: [0, -1],
      right: [0, 1],
      top: [-1, 0],
      bottom:[1, 0],
    };


    let max = this.rows * this.cols;
    for(let step of this.open) {
      for(let direction in neighbors) {
        if(max < 0) {
          console.log('Path not found');
          return [];
        }

        const nextRow = step.row + neighbors[direction][0];
        const nextCol = step.col + neighbors[direction][1];
        const key = `${nextRow}-${nextCol}`;

        if(nextRow < 0 || nextRow >= this.cells.length) {
          // console.log('out of bounds');
          continue;
        }
        if(nextCol < 0 || nextCol >= this.cells[nextRow].length) {
          // console.log('out of bounds');
          continue;
        }

        if(nextRow === endRow && nextCol === endCol) {
          const lastStep = new PathStep(nextRow, nextCol, step);
          // console.log('Path found');

          return this.getPath(lastStep);
        }

        if(this.closed.includes(key)) {
          // console.log('locked');
          continue;
        }

        if(this.open.includes(key)) {
          // console.log('already visited');
          continue;
        }

        // lock current cell
        this.closed.push(key);

        if(this.cells[nextRow][nextCol].isWall()) {
          console.log('wall');
          continue;
        }

        max--;

        const nextStep = new PathStep(nextRow, nextCol, step);

        // path not blocked, so add to open list
        this.open.push(nextStep);
        // this.renderer.getCell(nextRow, nextCol).classList.add('visited');
      }
    }

    console.log('Path not found');
    return [];
  }

  getPath(step) {
    const steps = [];
    steps.push(step);
    while(step.previous !== null) {
      steps.push(step.previous);
      step = step.previous;
    }

    return steps.reverse();
  }

  render(container) {
    this.renderer.render(container);
  }

  randomize(treshold = 0.3) {
    for(let row = 0; row < this.cells.length; row++) {
      for(let col = 0; col < this.cells[row].length; col++) {
        this.cells[row][col] = new Cell(row, col, Math.round(Math.random() - treshold));
      }
    }
  }

  setCell(row, col, value) {
    this.cells[row][col].value = value;
  }
}