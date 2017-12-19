"use strict";

var factor, prime;

/**
 * Test if two integers are coprime to each other. If they are, they will have
 * no common factors. Only pass numbers that are bigger than 1. When invalid
 * data is passed, the results will indicate that the numbers are coprime, so
 * don't use negative numbers, zero, or floating point numbers.
 *
 * @param {number} a
 * @param {number} b
 * @return {boolean}
 */
function coprime(a, b) {
    var aFactors, bFactors;

    aFactors = factor(a);
    bFactors = factor(b);

    if (prime(a)) {
        aFactors.push(a);
    }

    if (prime(b)) {
        bFactors.push(b);
    }

    while (aFactors.length && bFactors.length) {
        if (aFactors[0] < bFactors[0]) {
            aFactors.shift();
        } else if (aFactors[0] > bFactors[0]) {
            bFactors.shift();
        } else {
            return false;
        }
    }

    return true;
}

factor = require("./factor");
prime = require("./prime");
module.exports = coprime;
