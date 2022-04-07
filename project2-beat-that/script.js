var state = "1roll"; // 1choose 2roll 2choose
var dice1, dice2, player1, player2;

var rollDice = function () {
  return Math.ceil(Math.random() * 6);
};

var main = function (input) {
  if (state === "1roll") {
    dice1 = rollDice();
    dice2 = rollDice();
    state = "1choose";
    return `Player 1, you have rolled -<br>dice1: ${dice1}<br>dice2: ${dice2}. <br><br>Which dice first? Enter [1] or [2]`;
  } else if (state === "1choose") {
    if (input === "1") {
      player1 = dice1 * 10 + dice2;
    } else if (input === "2") {
      player1 = dice2 * 10 + dice1;
    } else {
      return `Player 1, you have rolled -<br>dice1: ${dice1}<br>dice2: ${dice2}. <br><br>Which dice first? Enter [1] or [2]`;
    }
    state = "2roll";
    return 'Player 2 - Click "Submit" to roll your dice.';
  } else if (state === "2roll") {
    dice1 = rollDice();
    dice2 = rollDice();
    state = "2choose";
    return `Player 2, you have rolled -<br>dice1: ${dice1}<br>dice2: ${dice2}. <br><br>Which dice first? Enter [1] or [2]`;
  } else if (state === "2choose") {
    if (input === "1") {
      player2 = dice1 * 10 + dice2;
    } else if (input === "2") {
      player2 = dice2 * 10 + dice1;
    } else {
      return `Enter [1] or [2]`;
    }
    var output = `Player1: ${player1} <br>Player2: ${player2}<BR><BR>`;
    if (player1 > player2) {
      output += "Player 1 wins!";
    } else if (player2 > player1) {
      output += "Player 2 wins!";
    } else {
      output += "It's a draw.";
    }
    state = "1roll";
    return output;
  }
};
