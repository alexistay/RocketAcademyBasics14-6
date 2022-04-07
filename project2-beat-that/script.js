var state = "roll"; // or choose
var player = 1; // or 2
var dice1, dice2, player1, player2;

var rollDice = function () {
  return Math.ceil(Math.random() * 6);
};

var getValueFromChoice = function (choice) {
  if (choice === "1") {
    return dice1 * 10 + dice2;
  } else if (choice === "2") {
    return dice2 * 10 + dice1;
  }
};

var getResults = function () {
  var output = `Player 1: ${player1} <br>Player 2: ${player2}<BR><BR>`;
  if (player1 > player2) {
    output += "Player 1 wins!";
  } else if (player2 > player1) {
    output += "Player 2 wins!";
  } else {
    output += "It's a draw.";
  }
  return output;
};

var main = function (input) {
  if (state === "roll") {
    dice1 = rollDice();
    dice2 = rollDice();
    state = "choose";
    return `Player ${player}, you have rolled -<br>dice1: ${dice1}<br>dice2: ${dice2}. <br><br>Which dice first? Enter [1] or [2]`;
  } else if (state === "choose") {
    var value = getValueFromChoice(input);
    if (player === 1) {
      player1 = value;
    } else {
      player2 = value;
    }

    if (player === 1) {
      state = "roll";
      player = 2;
      return 'Player 2 - Click "Submit" to roll your dice.';
    } else if (player === 2) {
      var output = getResults();
      state = "1roll";
      return output;
    }
  }
};
