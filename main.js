import CountDownTimer from "/timer.js";

const container = document.querySelector(".container");

// init grid
function initGrid(dimension) {
  for (let i = 0; i < dimension * dimension; i++) {
    let elem = document.createElement("div");
    container.appendChild(elem);
  }
  container.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;
}

// init filled in
function fillIn(num) {
  const allSquares = document.querySelectorAll(".container > div");
  let randomIndexes = [];
  let rand = (x, y) =>
    (x +
      ((y - x + 1) * crypto.getRandomValues(new Uint32Array(1))[0]) / 2 ** 32) |
    0;
  const squared = num * num;

  while (randomIndexes.length < num) {
    let randomlyGeneratedNumber = rand(0, squared - 1);
    if (randomIndexes.indexOf(randomlyGeneratedNumber) === -1) {
      randomIndexes.push(randomlyGeneratedNumber);
    }
  }

  // console.log(randomIndexes);

  for (let i = 0; i < randomIndexes.length; i++) {
    // console.log(randomIndexes[i]);
    allSquares[randomIndexes[i]].classList.add("blackened");
  }

  collectGuess(num, randomIndexes);
}

// flip over
function flipOver() {
  let filledIn = document.querySelectorAll(".blackened");
  for (let i = 0; i < filledIn.length; i++) {
    filledIn[i].classList.remove("blackened");
  }
}

// detect Selections
function collectGuess(numBlackened, randomIndexes) {
  const guesses = [];
  let squared = numBlackened * numBlackened;
  container.addEventListener("click", e => {
    // console.log(e.target);
    if (guesses.length < numBlackened) {
      // only push unique squares clicked
      if (guesses.indexOf(indexOfNodeList(e.target, squared)) === -1) {
        guesses.push(indexOfNodeList(e.target, squared));
      }
      e.target.classList.add("blackened");
      // console.log(guesses);
    }

    if (guesses.length === numBlackened) {
      //call check
      let ascendingGuesses = guesses.sort((a, b) => a - b);
      let ascendingIndexes = randomIndexes.sort((a, b) => a - b);

      // console.log(ascendingGuesses, ascendingIndexes);
      if (arraysEqual(ascendingGuesses, ascendingIndexes)) {
        alert("CORRECT");
        // reset clock

        // next level
      } else {
        alert("WRONG");
        // show correct

        // x out wrong ones
      }
    }
  });
}

// index Of selection in NodeList
function indexOfNodeList(element, squared) {
  for (let i = 0; i < squared; i++) {
    if (document.querySelectorAll(".container > div")[i] == element) {
      return i;
    }
  }
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// check (correct, score n/n )

// try again

// next level

// Create new Timer
const display = document.querySelector("#timer"),
  timer = new CountDownTimer(3);

// timer
//   .onTick(format)
//   .onTick(restart)
//   .start();

function restart() {
  console.log(this.timesExpired);
  if (this.timesExpired == 2) {
    this.running = false;
    alert("TIME OUT");
    this.timesExpired = 0;
    // initGrid(5);
    // fillIn(5);
  } else if (this.expired()) {
    flipOver();
    this.timesExpired++;
    console.log(this.timesExpired);
    timer.start();
  }
}

function format(minutes, seconds) {
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  display.textContent = minutes + ":" + seconds;
}

const numSquares = document.querySelector("#input_squares");
const numGrid = document.querySelector("#input_grid");

function reInitGrid() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

// TODO: debounce?
numSquares.addEventListener("input", e => {
  // reset before filling in
  reInitGrid();
  fillIn(e.target.value);
});

numGrid.addEventListener("input", e => {
  reInitGrid();
  initGrid(e.target.value);
});

initGrid(5);
fillIn(5);
// collectGuess(5);
