const STATE_ENTER_NUM_PLAYERS = "STATE_ENTER_NUM_PLAYERS";
const STATE_DEAL = "STATE_DEAL";
const STATE_NEW_PLAYER = "STATE_NEW_PLAYER";
const STATE_PLAYER_COMPUTER_HIT_STAND = "STATE_PLAYER_COMPUTER_HIT_STAND";
const STATE_REVEAL = "STATE_REVEAL";
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
  var color;
  if (card.suit === HEARTS || card.suit === DIAMONDS) {
    color = "red";
  } else {
    color = "black";
  }
  return `<span style="font-size:120px; color:${color}">${
    dictCardEmoji[card.name + " " + card.suit]
  }</span>`;
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
var displayPlayerHand = function (player) {
  return `Player ${player} hand: [${getHandValue(hands[player])} points]<br>${displayHand(
    hands[player],
    false
  )}`;
};

// returns HTML of computer hand, determines whether to hideFirstCard, and shows total value if not hiding first card
var displayComputerHand = function () {
  var text = `Computer hand: `;
  var hideFirstCard = currentState !== STATE_REVEAL;
  if (!hideFirstCard) {
    // show points if not hiding first card
    text += `[${getHandValue(hands[0])} points]`;
  }
  text += `<br>${displayHand(hands[0], hideFirstCard)}`;
  return text;
};

// displays all hands if state needs it
var displayHands = function () {
  if (currentState === STATE_ENTER_NUM_PLAYERS) {
    return "";
  }

  var html = "<BR><HR>";
  html += `${displayComputerHand()}`;
  // 1s based! Index 0 is computer
  for (let i = 1; i <= numPlayers; i++) {
    html += `<BR><BR> ${displayPlayerHand(i)}`;
  }
  return html;
};

var reset = function () {
  hands = [];
  currentPlayer = 1; //1s based!
};

var getCard = function () {
  if (deck.length === 0) {
    deck = shuffleCards(makeDeck());
  }
  return deck.pop();
};

var deal = function () {
  // push empty array for computer
  hands.push([]);
  // push empty array for each player's hand
  for (let i = 0; i < numPlayers; i++) {
    hands.push([]);
  }

  // for 2 cards
  for (let cards = 0; cards < 2; cards++) {
    // deal 1 card for each player or computer
    for (let i = 0; i < hands.length; i++) {
      hands[i].push(getCard());
    }
  }
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
  var results = "";
  var computerValue = getHandValue(hands[0]);
  if (isBusted(hands[0])) {
    return "Computer busted. All players win!";
  }
  // 1s based! index 0 is computer
  for (let i = 1; i <= numPlayers; i++) {
    var playerHand = hands[i];
    var playerValue = getHandValue(playerHand);

    if (isBusted(playerHand)) {
      results += `Player ${i} busted! Computer wins.`;
    } else if (isBlackjack(playerHand)) {
      results += `Player ${i} got Blackjack! Player wins.`;
    } else if (isBlackjack(hands[0])) {
      results += "Computer got Blackjack! Computer wins.";
    } else if (playerValue === computerValue) {
      results += `Both Player ${i} and Computer ${playerValue} points. It's a draw!`;
    } else if (playerValue > computerValue) {
      results += `Player ${i} ${playerValue} points, Computer ${computerValue} points. Player wins!`;
    } else {
      results += `Player ${i} ${playerValue} points, Computer ${computerValue} points. Computer wins!`;
    }
    results += "<BR>";
  }
  return results;
};

var button = document.querySelector("#output-div");
var btnHit = document.querySelector("#hit");
var btnStand = document.querySelector("#stand");
var inputTextBox = document.querySelector("#input-field");

btnHit.addEventListener("click", function () {
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

// hides the 2 hit stand buttons, and change the default button text
var hideHitStand = function (buttonText) {
  btnHit.style.display = "none";
  btnStand.style.display = "none";
  button.style.display = "";
  button.textContent = buttonText;
};

var updateUI = function () {
  if (nextState === STATE_DEAL) {
    hideHitStand("Deal");
  } else if (nextState === STATE_NEW_PLAYER) {
    if (isPlayerTurn()) {
      hideHitStand("Next Player");
    } else {
      hideHitStand("Computer");
    }
  } else if (nextState === STATE_PLAYER_COMPUTER_HIT_STAND) {
    if (isPlayerTurn()) {
      showHitStand();
    } else {
      hideHitStand("Computer");
    }
  } else if (nextState === STATE_REVEAL) {
    hideHitStand("Reveal");
  }
};

var currentState = STATE_ENTER_NUM_PLAYERS;
var nextState = STATE_ENTER_NUM_PLAYERS;
var hands = [];
var deck = shuffleCards(makeDeck());
var numPlayers;
var currentPlayer = 1;

var getPrompt = function () {
  var output;
  if (nextState === STATE_NEW_PLAYER && isPlayerTurn()) {
    output = ` Player ${currentPlayer} turn. Click [Next Player]`;
  } else if (isPlayerTurn()) {
    output = ` ${displayPlayerHand(
      currentPlayer
    )}</BR> Player ${currentPlayer}: Click [Hit] or [Stand]`;
  } else {
    output = " Computer turn. Click [Computer]";
  }
  return output;
};

var nextPlayer = function () {
  currentPlayer += 1;
  nextState = STATE_NEW_PLAYER;
};

var isPlayerTurn = function () {
  return currentPlayer <= numPlayers;
};
var main = function (input) {
  var output = "";
  currentState = nextState;
  if (currentState === STATE_ENTER_NUM_PLAYERS) {
    if (!isNaN(input) && input !== "") {
      numPlayers = Number(input);
      currentState = STATE_DEAL; // go immediately to deal state
    } else {
      return "Please enter a valid number for number of players";
    }
  }
  if (currentState === STATE_DEAL) {
    reset();
    deal();
    nextState = STATE_NEW_PLAYER;
    output = getPrompt() + "<BR>";
  } else if (currentState === STATE_NEW_PLAYER) {
    // if blackjack, display message and next player
    if (isPlayerTurn()) {
      if (isBlackjack(hands[currentPlayer])) {
        output = `${displayPlayerHand(
          currentPlayer
        )} <BR> Player ${currentPlayer} has Blackjack! Player wins!<BR>`;
        nextPlayer();
        output += getPrompt();
      } else {
        // ask user to hit or stand
        nextState = STATE_PLAYER_COMPUTER_HIT_STAND;
        output = getPrompt() + "<BR>";
      }
    } else {
      // Computer turn
      output = `<BR>${displayComputerHand()}<BR>`;
      nextState = STATE_PLAYER_COMPUTER_HIT_STAND;
      output += getPrompt();
    }
  } else if (currentState === STATE_PLAYER_COMPUTER_HIT_STAND) {
    if (isPlayerTurn()) {
      // player turn
      if (input.toUpperCase() === "HIT") {
        hands[currentPlayer].push(getCard());
        if (isBusted(hands[currentPlayer])) {
          output = `${displayPlayerHand(currentPlayer)}<BR>Player ${currentPlayer} busted! <BR>`;
          nextPlayer();
          output += getPrompt();
        } else {
          output = getPrompt() + "<BR>";
        }
      } else if (input.toUpperCase() === "STAND") {
        output = `${displayPlayerHand(currentPlayer)}<BR>`;
        nextPlayer();
        output += getPrompt() + "<BR>";
      }
    } else {
      // computer turn
      if (getHandValue(hands[0]) <= 16) {
        hands[0].push(getCard());
        output = `Computer hits... <BR> ${displayComputerHand()} <BR>Click [Computer] for Computer's next move.`;
      } else {
        output = `Computer stands... <BR> ${displayComputerHand()} <BR>Click [Reveal]`;
        nextState = STATE_REVEAL;
      }
    }
  } else if (currentState === STATE_REVEAL) {
    output = `<BR> ${displayComputerHand()} <BR>${getGameOutcome()}`;
    nextState = STATE_DEAL;
  }
  output += displayHands();
  updateUI();
  return output;
};
