const SCISSORS = "scissors";
const PAPER = "paper";
const STONE = "stone";
const RSCISSORS = "reversed scissors";
const RPAPER = "reversed paper";
const RSTONE = "reversed stone";

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
  return x === y || x === "reversed " + y || "reversed " + x === y;
};

var doesXWinY = function (x, y) {
  // only allows reversed in x
  return (
    (x === SCISSORS && y === PAPER) ||
    (x === PAPER && y === STONE) ||
    (x === STONE && y === SCISSORS) ||
    (x === RSCISSORS && y === STONE) ||
    (x === RPAPER && y === SCISSORS) ||
    (x === RSTONE && y === PAPER)
  );
};

var getEmoji = function (choice) {
  if (choice === SCISSORS) {
    return "✂️";
  } else if (choice === PAPER) {
    return "📄";
  } else if (choice === STONE) {
    return "🪨";
  } else if (choice === RSCISSORS) {
    return "◀️✂️";
  } else if (choice === RPAPER) {
    return "◀️📄";
  } else if (choice === RSTONE) {
    return "◀️🪨";
  } else {
    return "❓";
  }
};
var isValidInput = function (input) {
  return (
    input === SCISSORS ||
    input === PAPER ||
    input === STONE ||
    input === RSCISSORS ||
    input === RPAPER ||
    input === RSTONE
  );
};

var main = function (input) {
  var output;
  if (!isValidInput(input)) {
    return "Invalid input.<br>Enter either 'scissors', 'paper', 'stone', 'reversed scissors', 'reversed paper' or 'reversed stone'";
  }

  var computerChoice = getComputerChoice();
  output = `The computer chose ${computerChoice}${getEmoji(
    computerChoice
  )}.<br>`;
  output += `You chose ${input}${getEmoji(input)}.<br><br>`;

  if (isDraw(computerChoice, input)) {
    output += "It's a draw!";
  } else if (doesXWinY(input, computerChoice)) {
    output += "You win. ✌️";
  } else {
    output += "Computer win. 😥";
  }
  return output;
};
