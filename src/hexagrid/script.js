



document.addEventListener('DOMContentLoaded', function() {

  const grid = new Grid(8, 8, 40);
  document.body.appendChild(grid.render());

  // const svg = document.getElementById('hex-grid');
  // const hexRadius = 40;
  // const gridColumns = 5;
  // const gridRows = 5;

  // const hexWidth = Math.sqrt(3) * hexRadius;
  // const hexHeight = 2 * hexRadius;

  // const offset1 = hexRadius * 0.234;
  // const offset2 = hexRadius * 0.111;

  // for (let col = 0; col < gridColumns; col++) {
  //     for (let row = 0; row < gridRows; row++) {
  //         const x = col * 1.5 * (hexRadius + 1) + hexRadius;
  //         const y = row * (hexHeight - offset1) + (col % 2) * ((hexHeight) / 2 - offset2) + hexRadius;

  //         const hexagon = new Hexagon(x, y, hexRadius);
  //         svg.appendChild(hexagon.render());
  //     }
  // }



  // function createHexagon(x, y, radius) {
  //     const hexagon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

  //     const points = [];
  //     for (let i = 0; i < 6; i++) {
  //         const angle = 2 * Math.PI / 6 * i;
  //         const pointX = x + radius * Math.cos(angle);
  //         const pointY = y + radius * Math.sin(angle);
  //         points.push(`${pointX},${pointY}`);
  //     }

  //     hexagon.setAttribute('points', points.join(' '));
  //     hexagon.classList.add('hex');

  //     hexagon.addEventListener('click', function() {
  //         console.log('clicked');
  //     });

  //     return hexagon;
  // }
});
