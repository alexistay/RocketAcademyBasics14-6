const SCISSORS = "scissors";
const PAPER = "paper";
const STONE = "stone";
const ROCK = "rock";
const LIZARD = "lizard";
const SPOCK = "Spock";
const RSCISSORS = "reversed scissors";
const RPAPER = "reversed paper";
const RSTONE = "reversed stone";
const SPSOPTIONS =
  "Enter either 'scissors', 'paper', 'stone', 'reversed scissors', 'reversed paper' or 'reversed stone'";
const RPSLSOPTIONS =
  "Enter either 'rock', 'paper', 'scissors', 'lizard' or 'Spock'" +
  "<BR><BR>Remember, scissors cuts paper, paper covers rock, rock crushes lizard, lizard poisons Spock, Spock smashes scissors, scissors decapitates lizard, lizard eats paper, paper disproves Spock, Spock vaporizes rock, and as it always has, rock crushes scissors.";
const GAMEOPTIONS =
  "Choose which game you want to play. Enter [1] or [2]:" +
  "<BR>1. Scissors paper stone" +
  "<BR>2. Rock Paper Scissors Lizard Spock";

var numDraw = 0;
var numWin = 0;
var numLoss = 0;

const MODENAME = "name";
const MODEGAME = "game";
const MODESPS = "sps";
const MODERPSLS = "rpsls";

var mode = MODENAME;
var username;

var getComputerChoice = function () {
  if (mode === MODESPS) {
    var randomDecimal = Math.random() * 3;
    var randomInteger = Math.floor(randomDecimal);
    var options = [SCISSORS, PAPER, STONE];
    return options[randomInteger];
  } else if (mode === MODERPSLS) {
    randomDecimal = Math.random() * 5;
    randomInteger = Math.floor(randomDecimal);
    options = [ROCK, PAPER, SCISSORS, LIZARD, SPOCK];
    return options[randomInteger];
  }
};

var isDraw = function (x, y) {
  return x === y || x === "reversed " + y || "reversed " + x === y;
};

var doesXWinY = function (x, y) {
  // only allow reversed in x
  if (mode === MODESPS) {
    return (
      (x === SCISSORS && y === PAPER) ||
      (x === PAPER && y === STONE) ||
      (x === STONE && y === SCISSORS) ||
      (x === RSCISSORS && y === STONE) ||
      (x === RPAPER && y === SCISSORS) ||
      (x === RSTONE && y === PAPER)
    );
  } else if (mode === MODERPSLS) {
    return (
      (x === SCISSORS && y === PAPER) ||
      (x === PAPER && y === ROCK) ||
      (x === ROCK && y === LIZARD) ||
      (x === LIZARD && y === SPOCK) ||
      (x === SPOCK && y === SCISSORS) ||
      (x === SCISSORS && y === LIZARD) ||
      (x === LIZARD && y === PAPER) ||
      (x === PAPER && y === SPOCK) ||
      (x === SPOCK && y === ROCK) ||
      (x === ROCK && y === SCISSORS)
    );
  }
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
  } else if (choice === STONE || choice === ROCK) {
    emoji += "🥌";
  } else if (choice === LIZARD) {
    emoji += "🦎";
  } else if (choice === SPOCK) {
    emoji += "🖖🏻";
  }
  return emoji;
};

var isValidInput = function (input) {
  if (mode === MODESPS) {
    return (
      input === SCISSORS ||
      input === PAPER ||
      input === STONE ||
      input === RSCISSORS ||
      input === RPAPER ||
      input === RSTONE
    );
  } else if (mode === MODERPSLS) {
    return (
      input === ROCK ||
      input === PAPER ||
      input === SCISSORS ||
      input === LIZARD ||
      input === SPOCK
    );
  }
};

var processName = function (input) {
  username = input;
  mode = MODEGAME;
  return GAMEOPTIONS;
};

var getChoiceText = function (choice) {
  return (
    choice + "<span style='font-size: x-large;'>" + getEmoji(choice) + "</span>"
  );
};

// gives the outcome string for choices x & y
// returns empty string if choices are not x & y
// returns outcome string if choices are x & y, checking for both sides

var test1Output = function (choice1, choice2, x, y, outcome) {
  if ((choice1 === x && choice2 === y) || (choice1 === y && choice2 === x)) {
    return outcome;
  }
  return "";
};

var getOutcomeText = function (x, y) {
  var output = "";

  if (mode === MODESPS) {
    output += test1Output(x, y, SCISSORS, PAPER, "Scissors cuts paper.");
    output += test1Output(x, y, PAPER, STONE, "Paper wraps stone.");
    output += test1Output(x, y, STONE, SCISSORS, "Stone crushes scissors.");
    output += test1Output(
      x,
      y,
      RSCISSORS,
      PAPER,
      "Reversed - Scissors does not cut paper."
    );
    output += test1Output(
      x,
      y,
      RPAPER,
      STONE,
      "Reversed - Paper does not wrap stone."
    );
    output += test1Output(
      x,
      y,
      RSTONE,
      SCISSORS,
      "Reversed - Stone does not crush scissors."
    );
    output += test1Output(
      x,
      y,
      SCISSORS,
      RPAPER,
      "Reversed - Scissors does not cut paper."
    );
    output += test1Output(
      x,
      y,
      PAPER,
      RSTONE,
      "Reversed - Paper does not wrap stone."
    );
    output += test1Output(
      x,
      y,
      STONE,
      RSCISSORS,
      "Reversed - Stone does not crushe scissors."
    );
  } else if (mode === MODERPSLS) {
    output += test1Output(x, y, SCISSORS, PAPER, "Scissors cuts paper.");
    output += test1Output(x, y, PAPER, ROCK, "Paper covers rock.");
    output += test1Output(x, y, ROCK, LIZARD, "Rock crushes lizard.");
    output += test1Output(x, y, LIZARD, SPOCK, "Lizard poisons Spock.");
    output += test1Output(x, y, SPOCK, SCISSORS, "Spock smashes scissors.");
    output += test1Output(
      x,
      y,
      SCISSORS,
      LIZARD,
      "Scissors decapitates lizard."
    );
    output += test1Output(x, y, LIZARD, PAPER, "Lizard eats paper.");
    output += test1Output(x, y, PAPER, SPOCK, "Paper disproves Spock.");
    output += test1Output(x, y, SPOCK, ROCK, "Spock vaporizes rock.");
    output += test1Output(x, y, ROCK, SCISSORS, "Rock crushes scissors.");
  }
  return output;
};

var playGame = function (input) {
  var output;
  var options;
  if (mode === MODESPS) {
    options = SPSOPTIONS;
  } else if (mode === MODERPSLS) {
    options = RPSLSOPTIONS;
  }

  if (!isValidInput(input)) {
    return `Invalid input.<br><br>${options}`;
  }

  var computerChoice = getComputerChoice();
  output = `The computer chose ${getChoiceText(computerChoice)}.<br>`;
  output += `You chose ${getChoiceText(input)}.<br><br>`;
  output += getOutcomeText(input, computerChoice) + "<br>";
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

  output += `<br><br>${username}, you have ${numWin} wins, ${numDraw} draws and ${numLoss} losses. `;

  output += `<br><br>${options} to play again.`;
  return output;
};

var processGameChoice = function (input) {
  input = Number(input);
  if (input !== 1 && input !== 2) {
    return "Invalid choice. <BR><BR>" + GAMEOPTIONS;
  }
  if (input === 1) {
    console.log("1");
    mode = MODESPS;
    return SPSOPTIONS;
  } else if (input === 2) {
    console.log("2");
    mode = MODERPSLS;
    return RPSLSOPTIONS;
  }
  console.log("as");
};

var main = function (input) {
  var output;

  if (mode === MODENAME) {
    output = processName(input);
  } else if (mode === MODEGAME) {
    output = processGameChoice(input);
  } else {
    output = playGame(input);
  }
  return output;
};
