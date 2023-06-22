/// <reference path="utility-functions.ts" />
import util = Utility.Fees;
const maxBooksAllowed = Utility.maxBooksAllowed(10);
const calculateFees = util.calculateLateFee(5);
console.log(maxBooksAllowed, calculateFees);

