var getRandomWord = function (input) {
  var randomDecimal = Math.random() * 3;
  var randomInteger = Math.floor(randomDecimal);

  if (randomInteger == 0) {
    return "banana";
  }
  if (randomInteger == 1) {
    return "chisel";
  }
  if (randomInteger == 2) {
    return "faucet";
  }
};

var numberWordsGuessed = 0;
var secretWordBaseMain = function (input) {
  // Complete the Base: Secret Word exercise below with secretWordBaseMain as the main function.
  var myOutputValue = "";
  var randomWord = getRandomWord();
  if (randomWord == input) {
    numberWordsGuessed += 1;
    myOutputValue = "You guessed correctly.";
  } else {
    myOutputValue = "You guessed wrongly.";
  }
  myOutputValue += ` Random word was ${randomWord}.`;
  myOutputValue += ` You have guessed ${numberWordsGuessed} time(s) correctly.`;
  if (numberWordsGuessed === 2) {
    myOutputValue += "Congrats! You have won the game.";
  }

  return myOutputValue;
};

var prevCorrect = false;
var secretWordTwiceRowMain = function (input) {
  // Complete the Comfortable: Secret Word Twice in a Row exercise below with secretWordTwiceRowMain as the main function.
  var myOutputValue = "";
  var randomWord = getRandomWord();
  if (randomWord === input) {
    myOutputValue = "You guessed correctly.";
    if (prevCorrect === true) {
      myOutputValue += " Congrats! You have won the game";
    } else {
      prevCorrect = true;
    }
  } else {
    myOutputValue = "You guessed wrongly.";
    prevCorrect = false;
  }
  myOutputValue += ` Random word was ${randomWord}.`;
  return myOutputValue;
};

var numCorrectNeeded = 0;
var numCorrectSoFar = 0;
var secretWordXRowMain = function (input) {
  // Complete the Comfortable: Secret Word X in a Row exercise below with secretWordXRowMain as the main function.
  var myOutputValue = "";

  // set numCorrectNeeded if necessary - start of a new round
  if (numCorrectNeeded === 0) {
    numCorrectNeeded = Math.floor(Math.random() * 3) + 2;
  }

  // get random word
  var randomWord = getRandomWord();

  // if user gussed correctly
  if (randomWord === input) {
    // increment numCorrectSoFar
    numCorrectSoFar += 1;
    myOutputValue = "You guessed correctly.";
  } else {
    // if user guessed wrongly
    // set numCorrectSoFar to 0
    numCorrectSoFar = 0;
    myOutputValue = "You guessed wrongly.";
  }

  // output messages
  myOutputValue += ` Random word was ${randomWord}.`;
  myOutputValue += ` You have guessed ${numCorrectSoFar} consecutive time(s).`;
  myOutputValue += ` ${numCorrectNeeded} correct times needed.`;

  // check if user has won the round
  if (numCorrectSoFar === numCorrectNeeded) {
    myOutputValue += "Congrats! You have won the game.";
    // reseting the game
    numCorrectNeeded = 0;
    numCorrectSoFar = 0;
  }

  return myOutputValue;
};

var diceWithinMain = function (input) {
  // Complete the More Comfortable: Dice Within exercise below with diceWithinMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var diceWithin2DiceMain = function (input) {
  // Complete the More Comfortable: Dice Within with 2 Dice exercise below with diceWithin2DiceMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var dice4DMain = function (input) {
  // Complete the More Comfortable: Dice 4D exercise below with dice4DeMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var secretWordTwice2Main = function (input) {
  // Complete the More Comfortable: Secret Word Twice in a Row 2 exercise below with secretWordTwice2Main as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};
