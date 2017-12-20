"use strict";

/**
 * @typedef {Object} ShiftOptions
 * @property {number} [shift=1]
 */

var caesarAlphabetMap;

/**
 * Standardizes the options for enciphering and deciphering.
 *
 * @param {Alphabet} alphabet
 * @param {?ShiftOptions} options
 * @return {ShiftOptions}
 */
function standardizeCipherOptions(alphabet, options) {
    if (!options) {
        options = {};
    }

    if (typeof options.shift !== "number") {
        options.shift = 1;
    }

    if (options.shift < 0) {
        options.shift = -options.shift;
        options.shift %= alphabet.length;
        options.shift = alphabet.length - options.shift;
    } else {
        options.shift %= alphabet.length;
    }

    return options;
}

caesarAlphabetMap = require("../alphabet-map/caesar");

module.exports = {
    /**
     * Deciphers with a shift cipher.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {?ShiftOptions} options
     * @return {Message}
     */
    decipher(message, alphabet, options) {
        var map;

        options = standardizeCipherOptions(alphabet, options);
        map = caesarAlphabetMap(alphabet, -options.shift);
        message.map(map);

        return message;
    },


    /**
     * Enciphers with a shift cipher.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {?ShiftOptions} options
     * @return {Message}
     */
    encipher(message, alphabet, options) {
        var map;

        options = standardizeCipherOptions(alphabet, options);
        map = caesarAlphabetMap(alphabet, options.shift);
        message.map(map);

        return message;
    }
};
