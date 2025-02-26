class PathStep {

  row = 0;
  col = 0;
  previous = null;

  /**
   * @param {number} row
   * @param {number} col
   * @param {PathStep}
   */
  constructor(row, col, previous) {
    this.row = row;
    this.col = col;

    this.previous = previous;
  }
}