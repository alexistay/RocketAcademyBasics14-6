var adjectives = [];

var madLibsAdjectivesMain = function (input) {
  // Complete the Base: Mad Libs Adjectives exercise below with madLibsAdjectivesMain as the main function.
  if (input !== "create") {
    adjectives.push(input);
    return adjectives;
  } else {
    var randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    var madlib = "Today is very ";
    return madlib + randomAdj;
  }
};

var mode = "input";
var madLibsInputCreateMain = function (input) {
  // Complete the Comfortable: Input and Create Mode exercise below with madLibsInputCreateMain as the main function.
  if (input === "create") {
    mode = "create";
  }
  if (mode === "input") {
    adjectives.push(input);
    return adjectives;
  } else if (mode === "create") {
    var randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    var madlib = "Today is very ";
    return madlib + randomAdj;
  }

  var myOutputValue = "hello world";
  return myOutputValue;
};

var madLibsMultipleWordsMain = function (input) {
  // Complete the Comfortable: Input Multiple Words exercise below with madLibsMultipleWordsMain as the main function.
  if (input !== "create") {
    var newAdjs = input.split(" ");
    for (var i = 0; i < newAdjs.length; i++) {
      adjectives.push(newAdjs[i]);
    }
    return adjectives;
  } else {
    var randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    var madlib = "Today is very ";
    return madlib + randomAdj;
  }
};

var exclamations = [];
var adverbs = [];
var nouns = [];

var madLibsMultipleTypesMain = function (input) {
  // Complete the More Comfortable: Mad Libs Multiple Word Types exercise below with madLibsMultipleTypesMain as the main function.
  if (input === "exclamation" || input === "adverb" || input === "noun" || input === "adjective") {
    mode = input;
    return "Enter a " + input;
  }
  if (input === "create") {
    var randomExclamation = exclamations[Math.floor(Math.random() * exclamations.length)];
    var randomAdverb = adverbs[Math.floor(Math.random() * adverbs.length)];
    var randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    var randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    var madLib = `${randomExclamation}! he said ${randomAdverb} as he jumped into his ${randomNoun} and drove off with his ${randomAdj} wife.`;
    return madLib;
  } else {
    if (mode === "exclamation") {
      exclamations.push(input);
      return exclamations;
    } else if (mode === "adverb") {
      adverbs.push(input);
      return adverbs;
    } else if (mode === "noun") {
      nouns.push(input);
      return nouns;
    } else if (mode === "adjective") {
      adjectives.push(input);
      return adjectives;
    }
  }
};

var madLibsPopularMain = function (input) {
  // Complete the More Comfortable: Popular Mad Libs exercise below with madLibsPopularMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var madLibsSetsMain = function (input) {
  // Complete the More Comfortable: Sets of Mad Libs exercise below with madLibsSetsMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};
