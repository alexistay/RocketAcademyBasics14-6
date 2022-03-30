var convertFahrenheitToCelsius = function (fahrenheit) {
  var celsius = ((Number(fahrenheit) - 32) * 5) / 9;
  return celsius;
};

var fahrenheitToCelsiusMain = function (input) {
  // Complete the Base: Fahrenheit to Celsius exercise below with fahrenheitToCelsiusMain as the main function.
  return convertFahrenheitToCelsius(input);
};

var convertKmToMiles = function (distanceInKm) {
  var distanceInMiles = distanceInKm * 0.62;
  return distanceInMiles;
};

var calculateTotalFuelCost = function (tripLengthInMiles) {
  var fuelInLiters = tripLengthInMiles / 9;
  var fuelCost = fuelInLiters * 2.2;
  return fuelCost;
};

var roadTripCostBase = function (input) {
  // Some code that calculates total fuel cost from distance in km
  var distanceInMiles = convertKmToMiles(input);
  var totalCost = calculateTotalFuelCost(distanceInMiles);
  return totalCost;
};
var roadTripCostBaseMain = function (input) {
  // Complete the Base: Road Trip Cost exercise below with roadTripCostBaseMain as the main function.
  return roadTripCostBase(input);
};

var calculateTotalFuelCostComfortable = function (
  tripLengthInMiles,
  costPerLitreOfFuel
) {
  var fuelInLiters = tripLengthInMiles / 9;
  var fuelCost = fuelInLiters * costPerLitreOfFuel;
  return fuelCost;
};

var roadTripCostComfortableMain = function (input) {
  // Complete the Comfortable: Road Trip Cost exercise below with roadTripCostComfortableMain as the main function.
  var distanceInMiles = convertKmToMiles(input);
  var trainCost = calculateTotalFuelCostComfortable(distanceInMiles, 2.0);
  var ferrariCost = calculateTotalFuelCostComfortable(distanceInMiles, 2.2);
  return ferrariCost - trainCost;
};

var convertGramsToPounds = function (grams) {
  return grams * 0.00220462;
};

var getWeightOfIceInPounds = function (numGuests) {
  var numDrinks = numGuests * 2;
  var numIceCubes = numDrinks * 4;
  var iceInGrams = numIceCubes * 1.5;
  var iceInPounds = convertGramsToPounds(iceInGrams);
  return iceInPounds;
};

var getTimeToMakeIce = function (pounds) {
  return pounds / 5;
};
var iceMachineMain = function (input) {
  // Complete the More Comfortable: Ice Machine exercise below with iceMachineMain as the main function.
  var numGuests = Number(input);
  var iceInPounds = getWeightOfIceInPounds(numGuests);

  return getTimeToMakeIce(iceInPounds);
};

var beerOrderMain = function (input) {
  // Complete the More Comfortable: Beer Order exercise below with beerOrderMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};

var cellularDataMain = function (input) {
  // Complete the More Comfortable: Cost of Cellular Data exercise below with cellularDataMain as the main function.
  var myOutputValue = "hello world";
  return myOutputValue;
};
