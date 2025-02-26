console.log('%cbootstrap.js :: 1 =============================', 'color: #f00; font-size: 1rem');


function test(size, start, end) {

  const cellSize = parseInt(document.querySelector('#matrix').offsetWidth / size / 2);

  const matrix = new Matrix(size, size, cellSize);
  matrix.randomize(0.25);

  matrix.render(document.querySelector('#matrix'));

  console.log(end);

  const startTime = new Date().getTime();
  const path = matrix.findPath(start[0], start[1], end[0], end[1]);
  const endTime = new Date().getTime();

  console.log(`Time: ${endTime - startTime}ms`);

  for(let step of path) {
    matrix.renderer.getCell(step.row, step.col).style.backgroundColor = '#0f0';
  }

  console.log('%cbootstrap.js :: 15 =============================', 'color: #f00; font-size: 1rem');
  console.log(path);
}


const size = parseInt(document.querySelector('#size-input').value);

document.querySelector('#start-input').value=`0,0`;
document.querySelector('#end-input').value=`${size-1},${size-1}`;

document.querySelector('#trigger-regenerate').addEventListener('click', (event) => {
  const size = parseInt(document.querySelector('#size-input').value);
  const start = document.querySelector('#start-input').value.split(',').map((value) => parseInt(value));
  const end = document.querySelector('#end-input').value.split(',').map((value) => parseInt(value));
  test(size, start, end);
});
document.querySelector('#trigger-3d').addEventListener('click', () => {
  event.currentTarget.classList.toggle('active');
  document.querySelector('.matrix-container').classList.toggle('rotated');
});


const start = document.querySelector('#start-input').value.split(',').map((value) => parseInt(value));
const end = document.querySelector('#end-input').value.split(',').map((value) => parseInt(value));

test(size, start, end);


// matrix.setCell(1, 3, 1);
// matrix.setCell(1, 4, 1);
// matrix.setCell(1, 5, 1);

// matrix.setCell(2, 0, 1);
// matrix.setCell(3, 1, 1);
// matrix.setCell(3, 2, 1);

// matrix.setCell(3, 3, 1);
// matrix.setCell(3, 4, 1);

// matrix.setCell(5, 2, 1);

// matrix.setCell(6, 2, 1);
// matrix.setCell(6, 3, 1);
// matrix.setCell(6, 4, 1);
// matrix.setCell(6, 5, 1);
// matrix.setCell(6, 6, 1);
// matrix.setCell(6, 7, 1);
// matrix.setCell(6, 8, 1);
// matrix.setCell(6, 9, 1);

// matrix.setCell(7, 4, 1);
// matrix.setCell(8, 4, 1);


