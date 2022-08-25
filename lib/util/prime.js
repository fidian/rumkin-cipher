/* This file has a higher complexity. Instead of breaking into functions,
 * this is going for speed, so additional complexity is allowed.
 *
 * The bitwise operations are there to do the quickest possible checks if a
 * number is an integer
 */
/* eslint complexity:0 no-bitwise:0 */
"use strict";

// Quick list of primes to cover numbers up to 10000.
const primeList = [
    2,
    3,
    5,
    7,
    11,
    13,
    17,
    19,
    23,
    29,
    31,
    37,
    41,
    43,
    47,
    53,
    59,
    61,
    67,
    71,
    73,
    79,
    83,
    89,
    97
];

/**
 * Determine if a number is prime. When not passed a number, returns the
 * array of cached primes.
 *
 * @param {number} [n]
 * @return {(boolean|Array.<number>)}
 */
module.exports = function prime(n) {
    if (typeof n === "undefined") {
        return primeList;
    }

    if (n < 2 || n !== ~~n) {
        // Can't be a prime since 2 is the lowest and we only deal with
        // integers.
        return false;
    }

    if (n > 3 && (n & 0x01) === 0x00) {
        // Even - eliminate quickly.
        return false;
    }

    // Build up the list of primes until we cover the minimum number of
    // primes needed.
    const root = ~~Math.sqrt(n);

    while (primeList[primeList.length - 1] < root) {
        let i = primeList[primeList.length - 1] + 2;

        while (!prime(i)) {
            i += 1;
        }

        primeList.push(i);
    }

    // Scan the primes. If our number is there, it's prime.
    for (let i = 0; i < primeList.length; i += 1) {
        if (primeList[i] === n) {
            return true;
        }
    }

    // If our number is less than the highest entry (plus 1), it's not prime.
    if (n < primeList[primeList.length] + 1) {
        return false;
    }

    // Now we do the longer check. Check if any of the prime numbers can
    // divide evenly into our number. Check from the first up through the
    // root number we found earlier. Start at index 1 because we've already
    // eliminated even numbers that aren't prime.
    let i = 1;

    while (primeList[i] <= root) {
        const quotient = n / primeList[i];

        if (quotient === ~~quotient) {
            return false;
        }

        i += 1;
    }

    return true;
};
