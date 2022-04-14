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

var shuffleDeck = function (deck) {
  return deck;
};

var cardText = function (card) {
  return `${card.name} of ${card.suit}`;
};

var displayCards = function (cards) {
  return cards.map(cardText).join(", ");
};

var displayHands = function () {
  return `Player hand: ${displayCards(playerCards)}<br>Computer hand: ${displayCards(
    computerCards
  )}`;
};

var reset = function () {
  deck = shuffleDeck(makeDeck());
  playerCards = [];
  computerCards = [];
};

var deal = function () {
  playerCards.push(deck.pop());
  computerCards.push(deck.pop());
  playerCards.push(deck.pop());
  computerCards.push(deck.pop());
};

var state = "deal";
var playerCards = [];
var computerCards = [];
var deck;
var output = "";
var main = function (input) {
  if (state === "deal") {
    reset();
    deal();
    output = displayHands();
    return output;
  }
};
