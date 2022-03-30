const SCISSORS = "scissors";
const PAPER = "paper";
const STONE = "stone";

var getComputerChoice = function () {
  var randomDecimal = Math.random() * 3;
  var randomInteger = Math.floor(randomDecimal);
  if (randomInteger === 0) {
    return SCISSORS;
  } else if (randomInteger === 1) {
    return PAPER;
  } else {
    return STONE;
  }
};

var isDraw = function (x, y) {
  return x === y;
};

var doesXWinY = function (x, y) {
  return (
    (x === SCISSORS && y === PAPER) ||
    (x === PAPER && y === STONE) ||
    (x === STONE && y === SCISSORS)
  );
};

var isValidInput = function (input) {
  return input === SCISSORS || input === PAPER || input === STONE;
};

var main = function (input) {
  var output;
  if (!isValidInput(input)) {
    return "Invalid input.<br>Enter either scissors paper or stone";
  }

  var computerChoice = getComputerChoice();
  output = `The computer chose ${computerChoice}.<br>`;
  output += `You chose ${input}.<br><br>`;

  if (isDraw(computerChoice, input)) {
    output += "It's a draw!";
  } else if (doesXWinY(computerChoice, input)) {
    output += "Computer wins!";
  } else {
    output += "You win!";
  }
  return output;
};
