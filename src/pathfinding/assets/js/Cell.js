class Cell
{
  /** @param Integer */
  x;

  /** @param Integer */
  y;

  value;

  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
  }

  isWall() {
    return this.value === 1;
  }
}