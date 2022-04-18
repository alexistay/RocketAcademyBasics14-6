const STATEDEAL = "DEAL";
const STATEPLAYERHITSTAND = "STATEPLAYERHITSTAND";
const STATECOMPUTERHITSTAND = "STATECOMPUTERHITSTAND";
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
        rank: rankCounter
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

var getCardEmoji = function (card) {
  var text = card.name + " " + card.suit;
  return `<span style="font-size:100px">${dictCardEmoji[text]}</span>`;
};

var displayCards = function (cards, hideFirstCard) {
  if (!hideFirstCard) {
    return cards.map(getCardEmoji).join(" ");
  } else {
    // hide first card
    var hiddenCards = JSON.parse(JSON.stringify(cards));
    hiddenCards[0].name = "Backside";
    hiddenCards[0].suit = "";
    return hiddenCards.map(getCardEmoji).join(" ");
  }
};

var displayPlayerHand = function () {
  return `Player hand [${getHandValue(playerCards)} points]<br>${displayCards(playerCards, false)}`;
};

var displayComputerHand = function (hideFirstCard) {
  var text = `Computer hand:`;
  if (!hideFirstCard) {
    text += `[${getHandValue(computerCards)} points]`;
  }
  text += `<br>${displayCards(computerCards, hideFirstCard)}`;
  return text;
};

var displayHands = function (hideFirstCard) {
  return displayPlayerHand() + "<br><BR><BR>" + displayComputerHand(hideFirstCard);
};

var reset = function () {
  deck = shuffleCards(makeDeck());
  playerCards = [];
  computerCards = [];
};

var deal = function () {
  playerCards.push(deck.pop());
  computerCards.push(deck.pop());
  playerCards.push(deck.pop());
  computerCards.push(deck.pop());
};

var hasAce = function (cards) {
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].rank === 1) {
      return true;
    }
  }
  return false;
};
var isBlackjack = function (cards) {
  return cards.length === 2 && hasAce(cards) && getHandValue(cards) === 21;
};

var getHandValue = function (cards) {
  var numAces = 0;

  var value = 0;
  for (let i = 0; i < cards.length; i++) {
    var card = cards[i];
    if (card.rank === 1) {
      value += 11;
      numAces++;
    } else if (card.rank > 10) {
      value += 10;
    } else {
      value += card.rank;
    }
  }

  while (value > 21 && numAces > 0) {
    value -= 10;
    numAces--;
  }
  return value;
};

var isBust = function (cards) {
  return getHandValue(cards) > 21;
};

var gameOutcome = function () {
  var playerValue = getHandValue(playerCards);
  var computerValue = getHandValue(computerCards);

  if (isBust(computerCards)) {
    return "Computer busted! Player wins.";
  } else if (isBust(playerCards)) {
    return "Player busted! Computer wins.";
  } else if (isBlackjack(playerCards)) {
    return "Player got Blackjack! Player wins.";
  } else if (isBlackjack(computerCards)) {
    return "Computer got Blackjack! Computer wins.";
  } else if (playerValue === computerValue) {
    return "It's a draw!";
  } else if (playerValue > computerValue) {
    return "Player wins!";
  } else {
    return "Computer wins!";
  }
};

var state = STATEDEAL;
var playerCards = [];
var computerCards = [];
var deck;

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

var setState = function (s) {
  state = s;
  if (state === STATEDEAL) {
    hideHitStand();
    button.textContent = "Reset";
  } else if (state === STATEPLAYERHITSTAND) {
    showHitStand();
  } else if (state === STATECOMPUTERHITSTAND) {
    hideHitStand();
    button.textContent = "Computer";
  }
};

var main = function (input) {
  var output = "";

  if (state === STATEDEAL) {
    reset();
    deal();
    output = displayHands(true);

    // if player has bj, player automatically wins
    if (isBlackjack(playerCards)) {
      output += "<BR><BR>Player has Blackjack! Player wins!";
      setState(STATEDEAL);
      return output;
    }
    output += "<BR><BR>Player turn: Click [Hit] or [Stand]";
    setState(STATEPLAYERHITSTAND);
    return output;
  } else if (state === STATEPLAYERHITSTAND) {
    if (input.toUpperCase() === "HIT") {
      playerCards.push(deck.pop());
      output = displayHands(true);
      if (isBust(playerCards)) {
        output += "<BR><BR>Player busted!<BR><BR>Click [Computer] for Computer's turn";
        setState(STATECOMPUTERHITSTAND);
        return output;
      }
      output += "<BR><BR>Player turn: Click [Hit] or [Stand]";
      return output;
    } else if (input.toUpperCase() === "STAND") {
      output = displayHands(true);
      output += "<BR><BR>Click [Computer] for Computer's turn";
      setState(STATECOMPUTERHITSTAND);
      return output;
    }
  } else if (state === STATECOMPUTERHITSTAND) {
    var computerValue = getHandValue(computerCards);
    output += displayComputerHand(true);
    while (computerValue <= 16) {
      // computer hits while value <=16
      computerCards.push(deck.pop());
      output += "<BR>Computer hits....";
      computerValue = getHandValue(computerCards);
      output += "<BR><BR>" + displayComputerHand(true);
    }
    output += "<BR>Computer stands..."; // finally stands in the end when value >16

    output += "<BR><BR>Final Hands<BR>" + displayHands(false);
    output += "<BR><BR>" + gameOutcome();
    setState(STATEDEAL);
    return output;
  }
};
