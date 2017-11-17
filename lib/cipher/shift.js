"use strict";

/**
 * @typedef {Object} ShiftOptions
 * @property {number} [count=1]
 */

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

    if (typeof options.count !== "number") {
        options.count = 1;
    }

    if (options.count < 0) {
        options.count = -options.count;
        options.count %= alphabet.length;
        options.count = alphabet.length - options.count;
    } else {
        options.count %= alphabet.length;
    }

    return options;
}

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
        options.count = (alphabet.length - options.count) % alphabet.length;

        if (options.count > 0) {
            map = alphabet.shiftLetterMap(options.count);
            message.map(map);
        }

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

        if (options.count > 0) {
            map = alphabet.shiftLetterMap(options.count);
            message.map(map);
        }

        return message;
    }
};
