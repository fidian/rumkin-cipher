/* Bitwise operations are used for fast conversions to integers.
 *
 * A constant condition is used and we b
 */
/* eslint no-bitwise:0 */
"use strict";

var cache, prime;

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
function factor(n) {
    var factors, i, primes, quotient, remainder;

    factors = [];

    if (n < 3 || n !== ~~n || prime(n)) {
        return factors;
    }

    if (cache[n]) {
        return cache[n];
    }

    primes = prime();
    i = 0;
    remainder = n;

    while (primes[i] * primes[i] <= remainder) {
        quotient = remainder / primes[i];

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

    cache[n] = factors;
    cache.keys.push(n);

    if (cache.keys.length > 250) {
        delete cache[cache.keys[0]];
        cache.keys.shift();
    }

    return factors;
}

prime = require("./prime");
cache = {
    keys: []
};
module.exports = factor;
