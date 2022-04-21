const STATE_DEAL = "DEAL";
const STATE_PLAYER_HIT_STAND = "STATEPLAYERHITSTAND";
const STATE_COMPUTER_HIT_STAND = "STATECOMPUTERHITSTAND";
const STATE_REVEAL = "STATEREVEAL";
const HEARTS = "Hearts";
const DIAMONDS = "Diamonds";
const CLUBS = "Clubs";
const SPADES = "Spades";

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = [HEARTS, DIAMONDS, CLUBS, SPADES];
  // Loop over the suits array
  for (var i = 0; i < suits.length; i += 1) {
    // Store the current suit in a variable

    var currentSuit = suits[i];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (var rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === 1) {
        cardName = "Ace";
      } else if (cardName === 11) {
        cardName = "Jack";
      } else if (cardName === 12) {
        cardName = "Queen";
      } else if (cardName === 13) {
        cardName = "King";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter > 10 ? 10 : rankCounter === 1 ? 11 : rankCounter // if >10 change to 10. if 1 change 11, else no change
      };
      // Add the new card to the deck
      cardDeck.push(card);
    }
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Source: https://www.krcmic.com/how-to-write-type-playing-card-symbol-emojis-on-keyboard/
var dictCardEmoji = {
  "Backside ": "&#127136;",
  "Ace Spades": "&#127137;",
  "2 Spades": "&#127138;",
  "3 Spades": "&#127139;",
  "4 Spades": "&#127140;",
  "5 Spades": "&#127141;",
  "6 Spades": "&#127142;",
  "7 Spades": "&#127143;",
  "8 Spades": "&#127144;",
  "9 Spades": "&#127145;",
  "10 Spades": "&#127146;",
  "Jack Spades": "&#127147;",
  "Queen Spades": "&#127149;",
  "King Spades": "&#127150;",
  "Ace Hearts": "&#127153;",
  "2 Hearts": "&#127154;",
  "3 Hearts": "&#127155;",
  "4 Hearts": "&#127156;",
  "5 Hearts": "&#127157;",
  "6 Hearts": "&#127158;",
  "7 Hearts": "&#127159;",
  "8 Hearts": "&#127160;",
  "9 Hearts": "&#127161;",
  "10 Hearts": "&#127162;",
  "Jack Hearts": "&#127163;",
  "Queen Hearts": "&#127165;",
  "King Hearts": "&#127166;",
  "Ace Diamonds": "&#127169;",
  "2 Diamonds": "&#127170;",
  "3 Diamonds": "&#127171;",
  "4 Diamonds": "&#127172;",
  "5 Diamonds": "&#127173;",
  "6 Diamonds": "&#127174;",
  "7 Diamonds": "&#127175;",
  "8 Diamonds": "&#127176;",
  "9 Diamonds": "&#127177;",
  "10 Diamonds": "&#127178;",
  "Jack Diamonds": "&#127179;",
  "Queen Diamonds": "&#127181;",
  "King Diamonds": "&#127182;",
  "Ace Clubs": "&#127185;",
  "2 Clubs": "&#127186;",
  "3 Clubs": "&#127187;",
  "4 Clubs": "&#127188;",
  "5 Clubs": "&#127189;",
  "6 Clubs": "&#127190;",
  "7 Clubs": "&#127191;",
  "8 Clubs": "&#127192;",
  "9 Clubs": "&#127193;",
  "10 Clubs": "&#127194;",
  "Jack Clubs": "&#127195;",
  "Queen Clubs": "&#127197;",
  "King Clubs": "&#127198;"
};

// returns HTML of a card emoji
var getCardEmoji = function (card) {
  return `<span style="font-size:120px">${dictCardEmoji[card.name + " " + card.suit]}</span>`;
};

// returns HTML of a hand in emojis.
var displayHand = function (cards, hideFirstCard) {
  if (!hideFirstCard) {
    return cards.map(getCardEmoji).join(" ");
  } else {
    // hide first card
    // do a deep copy of the cards array so that we can change the first card temporaily
    // https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript
    var hiddenCards = JSON.parse(JSON.stringify(cards));
    hiddenCards[0].name = "Backside";
    hiddenCards[0].suit = "";
    return hiddenCards.map(getCardEmoji).join(" ");
  }
};

// returns HTML of a player hand with hand value
var displayPlayerHand = function () {
  return `Player hand [${getHandValue(playerHand)} points]<br>${displayHand(playerHand, false)}`;
};

// returns HTML of computer hand, option to hideFirstCard and shows total value if not hiding first card
var displayComputerHand = function (hideFirstCard) {
  var text = `Computer hand:`;
  if (!hideFirstCard) {
    // show points if not hiding first card
    text += `[${getHandValue(computerHand)} points]`;
  }
  text += `<br>${displayHand(computerHand, hideFirstCard)}`;
  return text;
};

// displays both hands, hiding computer first card depending on the state
var displayHands = function () {
  var hideFirstCard = prevState !== STATE_REVEAL;
  return `<BR><HR>${displayPlayerHand()} <br><br> ${displayComputerHand(hideFirstCard)}`;
};

var reset = function () {
  deck = shuffleCards(makeDeck());
  playerHand = [];
  computerHand = [];
};

var deal = function () {
  playerHand.push(deck.pop());
  computerHand.push(deck.pop());
  playerHand.push(deck.pop());
  computerHand.push(deck.pop());
};

var hasAce = function (cards) {
  return cards.some((c) => c.name === "Ace");
};

var isBlackjack = function (cards) {
  return cards.length === 2 && hasAce(cards) && getHandValue(cards) === 21;
};

var getHandValue = function (cards) {
  var value = cards.reduce((value, card) => (value += card.rank), 0); // use 11 for ace initially
  var numAces = cards.filter((c) => c.name === "Ace").length;

  // if busted, convert aces from 11 to 1 if possible until value <21
  while (value > 21 && numAces > 0) {
    value -= 10;
    numAces -= 1;
  }
  return value;
};

var isBusted = function (cards) {
  return getHandValue(cards) > 21;
};

var getGameOutcome = function () {
  var playerValue = getHandValue(playerHand);
  var computerValue = getHandValue(computerHand);

  if (isBusted(computerHand)) {
    return "Computer busted! Player wins.";
  } else if (isBusted(playerHand)) {
    return "Player busted! Computer wins.";
  } else if (isBlackjack(playerHand)) {
    return "Player got Blackjack! Player wins.";
  } else if (isBlackjack(computerHand)) {
    return "Computer got Blackjack! Computer wins.";
  } else if (playerValue === computerValue) {
    return `Both ${playerValue} points. It's a draw!`;
  } else if (playerValue > computerValue) {
    return `Player ${playerValue} points, Computer ${computerValue} points. Player wins!`;
  } else {
    return `Player ${playerValue} points, Computer ${computerValue} points. Computer wins!`;
  }
};

var button = document.querySelector("#output-div");
var btnHit = document.querySelector("#hit");
var btnStand = document.querySelector("#stand");
var inputTextBox = document.querySelector("#input-field");

btnHit.addEventListener("click", function () {
  console.log("btnhit clicked");
  inputTextBox.value = "HIT";
  button.click();
});

btnStand.addEventListener("click", function () {
  inputTextBox.value = "STAND";
  button.click();
});

var showHitStand = function () {
  btnHit.style.display = "";
  btnStand.style.display = "";
  button.style.display = "none";
};

var hideHitStand = function () {
  btnHit.style.display = "none";
  btnStand.style.display = "none";
  button.style.display = "";
};

// sets the state, as well as visibility of buttons and text of main button
var setState = function (s) {
  state = s;
  if (state === STATE_DEAL) {
    hideHitStand();
    button.textContent = "Reset";
  } else if (state === STATE_PLAYER_HIT_STAND) {
    showHitStand();
  } else if (state === STATE_COMPUTER_HIT_STAND) {
    hideHitStand();
    button.textContent = "Computer";
  } else if (state === STATE_REVEAL) {
    hideHitStand();
    button.textContent = "Reveal";
  }
};

var state = STATE_DEAL;
var prevState; // this will be current state at the end of the main function.
var playerHand = [];
var computerHand = [];
var deck;

var main = function (input) {
  var output = "";
  prevState = state; // store the current state to decide whether to show the computer first card
  if (state === STATE_DEAL) {
    reset();
    deal();

    // if player has bj, player automatically wins
    if (isBlackjack(playerHand)) {
      output = "Player has Blackjack! Player wins!";
      setState(STATE_DEAL);
    } else {
      output = "Player: Click [Hit] or [Stand]";
      setState(STATE_PLAYER_HIT_STAND);
    }
  } else if (state === STATE_PLAYER_HIT_STAND) {
    if (input.toUpperCase() === "HIT") {
      playerHand.push(deck.pop());

      if (isBusted(playerHand)) {
        output = "Player busted! Click [Computer] for Computer's turn";
        setState(STATE_COMPUTER_HIT_STAND);
      } else {
        output = "Player: Click [Hit] or [Stand]";
      }
    } else if (input.toUpperCase() === "STAND") {
      output = "Click [Computer] for Computer's turn";
      setState(STATE_COMPUTER_HIT_STAND);
    }
  } else if (state === STATE_COMPUTER_HIT_STAND) {
    var computerValue = getHandValue(computerHand);
    if (computerValue <= 16) {
      // computer hits while value <=16
      computerHand.push(deck.pop());
      output = "Computer hits... Click [Computer] for Computer's turn";
    } else {
      output = "Computer stands... Click [Reveal]";
      setState(STATE_REVEAL);
    }
  } else if (state === STATE_REVEAL) {
    output = getGameOutcome();
    setState(STATE_DEAL);
  }
  output += displayHands();
  return output;
};
