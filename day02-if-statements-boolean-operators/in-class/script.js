var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var lucky11Main = function (input) {
  // Complete the Base: Lucky 11 exercise below with lucky11Main as the main function.
  var rollDice1 = rollDice();
  var rollDice2 = rollDice();
  console.log(`${rollDice1} ${rollDice2}`);
  if (rollDice1 == input || rollDice2 == input) {
    return "You've won!";
  } else if (rollDice1 + rollDice2 == 11) {
    return "You've won!";
  }

  var myOutputValue = "You've lost";

  return myOutputValue;
};

var hawkerFoodCategorisationMain = function (input) {
  // Complete the Base: Hawker Food Categorisation exercise below with hawkerFoodCategorisationMain as the main function.
  if (input == "chicken rice" || input == "nasi lemak") {
    return "rice";
  } else if (input == "hokkien mee" || input == "laksa") {
    return "noodles";
  } else if (input == "bak kut teh" || input == "roti prata") {
    return "others";
  } else {
    return "unknown";
  }
};

// Helper Function
var randomDigit = function () {
  var randomDecimal = Math.random() * 10;
  var randomInteger = Math.floor(randomDecimal);
  return randomInteger;
};

var fourDSingleDigitMain = function (input) {
  // Complete the Comfortable: 4D with Single-Digit Comparison exercise below with fourDSingleDigitMain as the main function.
  // generate 4 numbers
  var random1 = randomDigit();
  var random2 = randomDigit();
  var random3 = randomDigit();
  var random4 = randomDigit();
  // if input == 1 of 4 numbers then wins
  if (
    input == random1 ||
    input == random2 ||
    input == random3 ||
    input == random4
  ) {
    return `You've won! The numbers were ${random1}, ${random2}, ${random3} and ${random4}. You guessed ${input}.`;
  } else {
    return `You've lost. The numbers were ${random1}, ${random2}, ${random3} and ${random4}. You guessed ${input}.`;
  }
};

var hawkerFoodRandomnessMain = function (input) {
  // Complete the Comfortable: Hawker Food Randomness exercise below with hawkerFoodRandomnessMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

// Helper Function
var generateRandom4Digits = function () {
  var randomDecimal = Math.random() * 10000;
  var randomInteger = Math.floor(randomDecimal);
  return randomInteger;
};

var fourDWinningRangeMain = function (input) {
  // Complete the More Comfortable: 4D with Winning Range exercise below with fourDWinningRangeMain as the main function.

  // Generate the random number
  var random4Digits = generateRandom4Digits();

  // Calculate the difference of the 2 numbers
  var difference = input - random4Digits;

  // compare the difference if between -1000 and 1000
  // -1000 <= difference <= 1000
  if (-1000 <= difference && difference <= 1000) {
    return `You've won. Random number is ${random4Digits} and you guessed ${input}`.;
  } else {
    return `You've lost. Random number is ${random4Digits} and you guessed ${input}`.;
  }
};

var hawkerFoodOmakaseMain = function (input) {
  // Complete the More Comfortable: Hawker Food Omakase exercise below with hawkerFoodOmakaseMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};
