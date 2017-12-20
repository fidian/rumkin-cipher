/* Affine Cipher
 *
 * Find the index of a letter, shift it over according to a formula,
 * `f(x) = (ax + b) % m`, where `a` is a number that's coprime to the number
 * of letters in the alphabet and `b` is a static amount to shift after the
 * multiplication. `m` is the number of letters in the alphabet, and `x` is
 * the letter's index in the alphabet, with the first letter being numbered
 * 0.
 *
 * The value of `a` must be within `[1, m)` and `b` must be within `[0, m)`.
 * Both must be integers.
 *
 * A Caesar cipher can be expressed in Affine cipher terms by setting `a` to
 * 1 and setting `b` to be the amount to shift.
 */

/* Bitwise operations are in use to convert to integers.
 */
/* eslint no-bitwise:0 */
"use strict";

var affineAlphabetMap, flipMap, util;

util = require("../util/");
affineAlphabetMap = require("../alphabet-map/affine");
flipMap = require("../alphabet-map/flip-map");

/**
 * @typedef {Object} AffineOptions
 * @property {number} [multiplier=1]
 * @property {number} [shift=0]
 */

/**
 * Standardizes the options for enciphering and deciphering.
 *
 * @param {Alphabet} alphabet
 * @param {?AffineOptions} options
 * @return {AffineOptions}
 */
function standardizeCipherOptions(alphabet, options) {
    if (!options) {
        options = {};
    }

    if (typeof options.multiplier !== "number") {
        options.multiplier = 1;
    }

    options.multiplier = ~~options.multiplier;

    if (options.multiplier < 1 || options.multiplier >= alphabet.length) {
        throw new Error("Multipliers must be between 1 and the size of the alphabet");
    }

    if (!util.coprime(options.multiplier, alphabet.length)) {
        throw new Error("Multiplier must be coprime to alphabet length");
    }

    if (typeof options.shift !== "number") {
        options.shift = 0;
    }

    options.shift = ~~options.shift;

    if (options.shift < 0 || options.shift >= alphabet.length) {
        throw new Error("Shift must be between 0 and the size of the alphabet");
    }

    return options;
}

module.exports = {
    /**
     * Deciphers with an Affine cipher.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {?AffineOptions} options
     * @return {Message}
     */
    decipher(message, alphabet, options) {
        var map;

        options = standardizeCipherOptions(alphabet, options);
        map = affineAlphabetMap(alphabet, options.multiplier, options.shift);
        map = flipMap(map);
        message.map(map);

        return message;
    },


    /**
     * Enciphers with an Affine cipher.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {?AffineOptions} options
     * @return {Message}
     */
    encipher(message, alphabet, options) {
        var map;

        options = standardizeCipherOptions(alphabet, options);
        map = affineAlphabetMap(alphabet, options.multiplier, options.shift);
        message.map(map);

        return message;
    }
};
