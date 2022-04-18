var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];
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
        cardName = "ace";
      } else if (cardName === 11) {
        cardName = "jack";
      } else if (cardName === 12) {
        cardName = "queen";
      } else if (cardName === 13) {
        cardName = "king";
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

var cardText = function (card) {
  return `${card.name} of ${card.suit}`;
};

var displayCards = function (cards) {
  return cards.map(cardText).join(", ");
};

var displayHands = function () {
  var text = "";
  text = `Player hand: ${displayCards(playerCards)}. Value: ${getHandValue(playerCards)}`;
  text += `<br>Computer hand: ${displayCards(computerCards)}. Value: ${getHandValue(
    computerCards
  )}`;
  return text;
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

var isBlackjack = function (cards) {
  // if not 2 cards, then not blackjack
  if (cards.length !== 2) {
    return false;
  }

  // if reaches here, only 2 cards.

  // if no ace, return false
  if (cards[0].rank !== 1 && cards[1].rank !== 1) {
    return false;
  }

  // if reach here, means 2 cards, 1 ace.
  // if hand value == 11, means blackjack!

  var value = getHandValue(cards);
  return value === 11;
};

var getHandValue = function (cards) {
  if (isBlackjack(cards)) {
    return 21;
  }
  var value = 0;
  for (let i = 0; i < cards.length; i++) {
    var card = cards[i];
    if (card.rank > 10) {
      value += 10;
    } else {
      value += card.rank;
    }
  }
  return value;
};

var gameOutcome = function () {
  var playerValue = getHandValue(playerCards);
  var computerValue = getHandValue(computerCards);
  if ((isBlackjack(playerCards) && isBlackjack(computerCards)) || playerValue === computerValue) {
    return "It's a draw!";
  } else if (isBlackjack(playerCards)) {
    return "Player got Blackjack! Player wins";
  } else if (isBlackjack(computerCards)) {
    return "Computer got Blackjack! Computer wins";
  } else if (playerValue > computerValue) {
    return "Player wins!";
  } else {
    return "Computer wins!";
  }
};

var state = "deal";
var playerCards = [];
var computerCards = [];
var deck;

var main = function (input) {
  var output = "";

  if (state === "deal") {
    reset();
    deal();
    output = displayHands();
    output += "<BR>" + gameOutcome();
    return output;
  }
};
