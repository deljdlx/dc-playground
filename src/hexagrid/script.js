document.addEventListener('DOMContentLoaded', function() {
  const grid = new Grid(
    5,
    3,
    60,
    // true
  );
  document.body.appendChild(grid.render());
});
