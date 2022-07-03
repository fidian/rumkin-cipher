"use strict";

const factor = require("./factor");

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
module.exports = function coprime(a, b) {
    const aFactors = factor(a);
    const bFactors = factor(b);

    if (!aFactors.length) {
        aFactors.push(a);
    }

    if (!bFactors.length) {
        bFactors.push(b);
    }

    while (aFactors.length && bFactors.length) {
        if (aFactors[0] < bFactors[0]) {
            aFactors.shift();

            while (aFactors.length && aFactors[0] < bFactors[0]) {
                aFactors.shift();
            }
        } else if (aFactors[0] > bFactors[0]) {
            bFactors.shift();

            while (bFactors.length && aFactors[0] > bFactors[0]) {
                bFactors.shift();
            }
        } else {
            return false;
        }
    }

    return true;
};
