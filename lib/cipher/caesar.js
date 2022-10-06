"use strict";

/**
 * @typedef {Object} shiftOptions
 * @property {number} [shift=1]
 */

const caesarAlphabetMap = require("../alphabet-map/caesar");
const defaultOptions = require("../util/default-options");

/**
 * Standardizes the options for enciphering and deciphering.
 *
 * @param {Alphabet} alphabet
 * @param {?shiftOptions} options
 * @return {shiftOptions}
 */
function standardizeCipherOptions(alphabet, options) {
    const safeOptions = defaultOptions(options, {
        shift: {
            type: "integer",
            default: 1
        }
    });

    if (safeOptions.shift < 0) {
        safeOptions.shift = -safeOptions.shift;
        safeOptions.shift %= alphabet.length;
        safeOptions.shift = alphabet.length - safeOptions.shift;
    } else {
        safeOptions.shift %= alphabet.length;
    }

    return safeOptions;
}

module.exports = {
    /**
     * Deciphers with a shift cipher.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {?shiftOptions} options
     * @return {Message}
     */
    decipher(message, alphabet, options) {
        var map, result;

        options = standardizeCipherOptions(alphabet, options);
        map = caesarAlphabetMap(alphabet, -options.shift);
        result = message.map(map);

        return result;
    },

    /**
     * Enciphers with a shift cipher.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {?shiftOptions} options
     * @return {Message}
     */
    encipher(message, alphabet, options) {
        var map, result;

        options = standardizeCipherOptions(alphabet, options);
        map = caesarAlphabetMap(alphabet, options.shift);
        result = message.map(map);

        return result;
    }
};
