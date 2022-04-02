const SCISSORS = "scissors";
const PAPER = "paper";
const STONE = "stone";
const RSCISSORS = "reversed scissors";
const RPAPER = "reversed paper";
const RSTONE = "reversed stone";
const OPTIONS =
  "Enter either 'scissors', 'paper', 'stone', 'reversed scissors', 'reversed paper' or 'reversed stone'";

var numDraw = 0;
var numWin = 0;
var numLoss = 0;

var mode = "name";
var username;

var getComputerChoice = function () {
  var randomDecimal = Math.random() * 3;
  var randomInteger = Math.floor(randomDecimal);
  var options = [SCISSORS, PAPER, STONE];
  return options[randomInteger];
};

var isDraw = function (x, y) {
  return x === y || x === "reversed " + y || "reversed " + x === y;
};

var doesXWinY = function (x, y) {
  // only allow reversed in x
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
  var emoji = "";
  if (choice.substr(0, "reversed".length) === "reversed") {
    emoji += "◀️";
    choice = choice.replace("reversed ", "");
  }
  if (choice === SCISSORS) {
    emoji += "✂️";
  } else if (choice === PAPER) {
    emoji += "📄";
  } else if (choice === STONE) {
    emoji += "🥌";
  } else {
    emoji += "❓";
  }
  return emoji;
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

var processName = function (input) {
  username = input;
  mode = "play";
  return OPTIONS;
};

var playGame = function (input) {
  var output;
  if (!isValidInput(input)) {
    return `Invalid input.<br><br>${OPTIONS}`;
  }

  var computerChoice = getComputerChoice();
  output = `The computer chose ${computerChoice}${getEmoji(
    computerChoice
  )}.<br>`;
  output += `You chose ${input}${getEmoji(input)}.<br><br>`;

  if (isDraw(computerChoice, input)) {
    output += "It's a draw!";
    numDraw++;
  } else if (doesXWinY(input, computerChoice)) {
    output += "You win. ✌️";
    numWin++;
  } else {
    output += "Computer wins. 😥";
    numLoss++;
  }

  output += `<br>${username}, you have ${numWin} wins, ${numDraw} draws and ${numLoss} losses. `;
  output += `<br><br>${OPTIONS} to play again.`;

  return output;
};

var main = function (input) {
  var output;

  if (mode === "name") {
    output = processName(input);
  } else {
    output = playGame(input);
  }
  return output;
};
