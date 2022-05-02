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

var moarCardsSingleCardMain = function (input) {
  // Complete the Base: Moar Cards Display Single Card exercise below with moarCardsSingleCardMain as the main function.
  var deck = makeDeck();
  deck = shuffleCards(deck);
  var card = deck.pop();
  return `${card.name} of ${card.suit}`;
};

var moarCardsLowCardMain = function (input) {
  // Complete the Base: Moar Cards Low Card exercise below with moarCardsLowCardMain as the main function.
  var deck = makeDeck();
  deck = shuffleCards(deck);
  var computerCard = deck.pop();
  var playerCard = deck.pop();
  var output = `Computer: ${computerCard.name} of ${computerCard.suit}`;
  output += `<BR>Player: ${playerCard.name} of ${playerCard.suit}`;
  if (computerCard.rank === playerCard.rank) {
    output += "<BR>Draw.";
  } else if (computerCard.rank < playerCard.rank) {
    output += "<BR>Computer wins.";
  } else {
    output += "<BR>You win.";
  }

  return output;
};

var moarCardsLowCardQueenWinnerMain = function (input) {
  // Complete the Base: Moar Cards Low Card with Queen Winner exercise below with moarCardsLowCardQueenWinnerMain as the main function.
  var deck = makeDeck();
  deck = shuffleCards(deck);
  var computerCard = deck.pop();
  var playerCard = deck.pop();
  var output = `Computer: ${computerCard.name} of ${computerCard.suit}`;
  output += `<BR>Player: ${playerCard.name} of ${playerCard.suit}<BR>`;
  if (computerCard.rank === playerCard.rank) {
    output += "<BR>Draw.";
  } else if (computerCard.name === "queen") {
    output += "<BR>Computer wins.";
  } else if (playerCard.name === "queen") {
    output += "<BR>Player wins.";
  } else if (computerCard.rank < playerCard.rank) {
    output += "<BR>Computer wins.";
  } else {
    output += "<BR>You win.";
  }

  return output;
};

var moarCardsLowCardHandsMain = function (input) {
  // Complete the Base: Moar Cards Low Card Hands exercise below with moarCardsLowCardHandsMain as the main function.
  var deck = makeDeck();
  var numCards = Number(input);
  var playerCards = [];
  deck = shuffleCards(deck);
  var computerCard = deck.pop();

  for (let i = 0; i < numCards; i++) {
    playerCards.push(deck.pop());
  }

  var output = `Computer: ${computerCard.name} of ${computerCard.suit}`;
  output += `<BR>Player Cards: `;
  var bestCard = playerCards[0];
  for (let i = 0; i < numCards; i++) {
    output += `<br>${playerCards[i].name} of ${playerCards[i].suit}`;
    if (playerCards[i].name === "queen") {
      bestCard = playerCards[i];
    }
    if (playerCards[i].rank < bestCard.rank && bestCard.name !== "queen") {
      bestCard = playerCards[i];
    }
  }

  output += `<BR>Best card: ${bestCard.name} of ${bestCard.suit}`;
  if (computerCard.rank === bestCard.rank) {
    output += "<BR>Draw.";
  } else if (computerCard.rank === 12) {
    output += "<BR>Computer wins.";
  } else if (bestCard.rank === 12) {
    output += "<BR>You win.";
  } else if (computerCard.rank < bestCard.rank) {
    output += "<BR>Computer wins.";
  } else {
    output += "<BR>You win.";
  }

  return output;
};

var cardToStr = function (card) {
  var suit;

  if (card.suit === "hearts") {
    suit = "♥";
  } else if (card.suit === "diamonds") {
    suit = "♦";
  } else if (card.suit === "clubs") {
    suit = "♣";
  } else if (card.suit === "spades") {
    suit = "♠";
  }
  return `${card.name} of ${suit}`;
};

var moarCardsLowCardSuitMain = function (input) {
  // Complete the Base: Moar Cards Low Card Suit Output exercise below with moarCardsLowCardSuitMain as the main function.
  var deck = makeDeck();
  deck = shuffleCards(deck);
  var computerCard = deck.pop();
  var playerCard = deck.pop();
  var output = `Computer: ${cardToStr(computerCard)}`;
  output += `<BR>Player: ${cardToStr(playerCard)}<BR>`;

  if (computerCard.rank === playerCard.rank) {
    output += "<BR>Draw.";
  } else if (computerCard.name === "queen") {
    output += "<BR>Computer wins.";
  } else if (playerCard.name === "queen") {
    output += "<BR>Player wins.";
  } else if (computerCard.rank < playerCard.rank) {
    output += "<BR>Computer wins.";
  } else {
    output += "<BR>You win.";
  }

  return output;
};

var moarCardsLowCardWildCardMain = function (input) {
  // Complete the More Comfortable: Moar Cards Low Card with Wild Card exercise below with moarCardsLowCardWildCardMain as the main function.
};

var moarCardsLowCardWildPlayerMain = function (input) {
  // Complete the More Comfortable: Moar Cards Low Card with Player-Chosen Wild Card exercise below with moarCardsLowCardWildPlayerMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var moarCardsLowCardBetsMain = function (input) {
  // Complete the More Comfortable: Moar Cards Low Card with Bets exercise below with moarCardsLowCardBetsMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var moarCardsLowCard2PMain = function (input) {
  // Complete the More Comfortable: Moar Cards Low Card 2-Player Mode exercise below with moarCardsLowCard2PMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var moarCardsLowCard2PairsMain = function (input) {
  // Complete the More Comfortable: Moar Cards Low Card 2-Player Mode with Pairs exercise below with moarCardsLowCard2PairsMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var chatBotSingleMain = function (input) {
  // Complete the Base: Chat Bot Single Chat Bot Answer Set below with chatBotSingleMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var chatBotMultipleMain = function (input) {
  // Complete the Base: Chat Bot Multiple Chat Bot Answer Sets below with chatBotMultipleMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var chatBotUsernameMain = function (input) {
  // Complete the Base: Chat Bot Stores User's Name below with chatBotUsernameMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var chatBotAgeMain = function (input) {
  // Complete the Base: Chat Bot Stores User's Age below with chatBotAgeMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var chatBotNamedMain = function (input) {
  // Complete the More Comfortable: Chat Bot Named Answer Sets below with chatBotNamedMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var chatBotDynamicMain = function (input) {
  // Complete the More Comfortable: Dynamic Chat Bot below with chatBotDynamicMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var chatBotFortuneMain = function (input) {
  // Complete the More Comfortable: Chat Bot Fortune Telling below with chatBotFortuneMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};
