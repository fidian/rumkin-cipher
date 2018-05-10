"use strict";

/**
 * @typedef {Object} vigenereOptions
 * @property {string} key
 */

var Message;

Message = require("../util/message");

/**
 * Standardizes the options for enciphering and deciphering, plus makes the cipher maps.
 *
 * @param {Alphabet} alphabet
 * @param {?vigenereOptions} options
 * @return {vigenereOptions}
 */
function standardizeOptions(alphabet, options) {
    if (!options) {
        options = {};
    }

    options.key = options.key || "A";
    options.keyIndexes = alphabet.findLetterIndexes(options.key).filter((index) => {
        return index >= 0;
    });

    return options;
}

module.exports = {
    /**
     * Deciphers a message.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {?vigenereOptions} options
     * @return {Message}
     */
    decipher(message, alphabet, options) {
        var c, i, lettersOnly, result, val;

        options = standardizeOptions(alphabet, options);
        result = new Message();
        lettersOnly = message.separate(alphabet);

        for (i = 0; i < lettersOnly.length; i += 1) {
            c = lettersOnly.charAt(i);
            val = alphabet.toIndex(c.getValue());
            val -= options.keyIndexes[i % options.keyIndexes.length];
            c.setValue(alphabet.toLetter(val));
            result.append(c);
        }

        return message.overlay(alphabet, result);
    },

    /**
     * Enciphers a message.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {?vigenereOptions} options
     * @return {Message}
     */
    encipher(message, alphabet, options) {
        var c, i, lettersOnly, result, val;

        options = standardizeOptions(alphabet, options);
        result = new Message();
        lettersOnly = message.separate(alphabet);

        for (i = 0; i < lettersOnly.length; i += 1) {
            c = lettersOnly.charAt(i);
            val = alphabet.toIndex(c.getValue());
            val += options.keyIndexes[i % options.keyIndexes.length];
            c.setValue(alphabet.toLetter(val));
            result.append(c);
        }

        return message.overlay(alphabet, result);
    }
};
