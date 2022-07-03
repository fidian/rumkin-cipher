/* Bitwise operations are used for fast conversions to integers.
 *
 * A constant condition is used and we b
 */
/* eslint no-bitwise:0 */
"use strict";

const prime = require("./prime");

const cache = {
    keys: [],
    values: {}
};

/**
 * Return an array of the factors of a number. Memoized for faster results.
 *
 * When passed a number that is not an integer, is less than 3 or is prime,
 * no factors will be returned. This lists all of the prime factors of a
 * number, so calling `factor(8)` would result in `[2, 2, 2]`.
 *
 * @param {number} n
 * @return {Array.<number>}
 */
module.exports = function factor(n) {
    const factors = [];

    if (n < 3 || n !== ~~n || prime(n)) {
        return factors;
    }

    if (cache.values[n]) {
        // Return a copy of the cached array.
        return cache.values[n].slice();
    }

    const primes = prime();
    let i = 0;
    let remainder = n;

    while (primes[i] * primes[i] <= remainder) {
        const quotient = remainder / primes[i];

        if (quotient === ~~quotient) {
            // Divided evenly.
            factors.push(primes[i]);
            remainder = quotient;
        } else {
            // Advance to the next prime number.
            i += 1;
        }
    }

    factors.push(remainder);

    // Cache a copy of the array object.
    cache.values[n] = factors.slice();
    cache.keys.push(n);

    if (cache.keys.length > 250) {
        delete cache.values[cache.keys[0]];
        cache.keys.shift();
    }

    return factors;
};
