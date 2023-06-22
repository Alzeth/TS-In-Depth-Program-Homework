/// <reference path="utility-functions.ts" />
var util = Utility.Fees;
var maxBooksAllowed = Utility.maxBooksAllowed(10);
var calculateFees = util.calculateLateFee(5);
console.log(maxBooksAllowed, calculateFees);
