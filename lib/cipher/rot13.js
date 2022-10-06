"use strict";

/**
 * @typedef {Object} Rot13Options
 * @property {boolean} [rot5Numbers=false]
 */

const caesarAlphabetMap = require("../alphabet-map/caesar");
const defaultOptions = require("../util/default-options");
const rot5NumberMap = {
    0: "5",
    1: "6",
    2: "7",
    3: "8",
    4: "9",
    5: "0",
    6: "1",
    7: "2",
    8: "3",
    9: "4"
};


/**
 * Standardizes the options for enciphering and deciphering.
 *
 * @param {?Rot13Options} options
 * @return {Rot13Options}
 */
function standardizeCipherOptions(options) {
    return defaultOptions(options, {
        rot5Numbers: {
            type: "boolean"
        }
    });
}

module.exports = {
    /**
     * Deciphers with ROT13. Not quite the same because this needs to work with
     * alphabets that have odd numbers of letters. Technically, this is only
     * ROT13 when used with an English alphabet.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {?ShiftOptions} options
     * @return {Message}
     */
    decipher(message, alphabet, options) {
        var map, result, rot;

        options = standardizeCipherOptions(options);
        rot = alphabet.length - Math.floor(alphabet.length / 2);
        map = caesarAlphabetMap(alphabet, rot);
        result = message.map(map);

        if (options.rot5Numbers) {
            result = result.map(rot5NumberMap);
        }

        return result;
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
        var map, result, rot;

        options = standardizeCipherOptions(options);
        rot = Math.floor(alphabet.length / 2);
        map = caesarAlphabetMap(alphabet, rot);
        result = message.map(map);

        if (options.rot5Numbers) {
            result = result.map(rot5NumberMap);
        }

        return result;
    }
};
