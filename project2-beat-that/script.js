var state = "roll"; // or choose
var player = 1; // or 2
var dices, player1, player2;

var rollDice = function () {
  return Math.ceil(Math.random() * 6);
};

var getDices = function (numDice) {
  var dices = [];
  for (let i = 0; i < numDice; i++) {
    dices.push(rollDice());
  }
  return dices;
};
var getValueFromChoice = function (choice) {
  if (choice === "1") {
    return dices[0] * 10 + dices[1];
  } else if (choice === "2") {
    return dices[1] * 10 + dices[0];
  } else {
    return 0;
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
  output += "<br><br>Player 1 - Click 'Submit' to roll your dice.";
  return output;
};

var main = function (input) {
  if (state === "roll") {
    dices = getDices(2);
    state = "choose";
    return `Player ${player}, you have rolled -<br>dice1: ${dices[0]}<br>dice2: ${dices[1]}. <br><br>Which dice first? Enter [1] or [2]`;
  } else if (state === "choose") {
    var value = getValueFromChoice(input);
    if (value === 0) {
      return `Player ${player}, you have rolled -<br>dice1: ${dices[0]}<br>dice2: ${dices[1]}. <br><br>Which dice first? Enter [1] or [2]`;
    }
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
      state = "roll";
      player = 1;

      return output;
    }
  }
};
