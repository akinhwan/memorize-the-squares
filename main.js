// init grid
function initGrid(dimension) {
  const container = document.querySelector(".container");
  for (i = 0; i < dimension * dimension; i++) {
    let elem = document.createElement("div");
    container.appendChild(elem);
  }
  container.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;
}

// init filled in
function fillIn(num) {
  let allSquares = document.querySelectorAll(".container > div");
  let randomIndexes = [];
  let rand = (x, y) =>
    (x +
      ((y - x + 1) * crypto.getRandomValues(new Uint32Array(1))[0]) / 2 ** 32) |
    0;
  const squared = num * num;

  while (randomIndexes.length < num) {
    let randomlyGeneratedNumber = rand(0, squared);
    if (randomIndexes.indexOf(randomlyGeneratedNumber) === -1) {
      randomIndexes.push(randomlyGeneratedNumber);
    }
  }

  console.log(randomIndexes);

  for (i = 0; i < randomIndexes.length; i++) {
    console.log(randomIndexes[i]);
    allSquares[randomIndexes[i]].style.backgroundColor = "black";
  }
}

// flip over

// check (correct, score n/n )

// try again

// next level

// timer

initGrid(5);
fillIn(5);
