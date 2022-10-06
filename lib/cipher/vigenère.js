"use strict";

/**
 * @typedef {Object} vigenereOptions
 * @property {string} key
 * @property {boolean} [autokey=false]
 */

const defaultOptions = require("../util/default-options");
const Message = require("../util/message");

/**
 * Standardizes the options for enciphering and deciphering, plus makes the cipher maps.
 *
 * @param {Alphabet} alphabet
 * @param {?vigenereOptions} options
 * @return {vigenereOptions}
 */
function standardizeOptions(alphabet, options) {
    return defaultOptions(options, {
        autokey: {
            type: "boolean"
        },
        key: {
            type: "string",
            default: alphabet.letterOrder.upper.charAt(0)
        }
    });
}

/**
 * Create a list of key indexes. If there are no valid key indexes, this
 * returns an array with a single 0 value.
 *
 * @param {Alphabet} alphabet
 * @param {string} key
 * @return {Array<number>}
 */
function makeKeyIndexes(alphabet, key) {
    const result = [];

    for (const index of alphabet.findLetterIndexes(key)) {
        if (index >= 0) {
            result.push(index);
        }
    }

    if (!result.length) {
        result.push(0);
    }

    return result;
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
        options = standardizeOptions(alphabet, options);
        const keyIndexes = makeKeyIndexes(alphabet, options.key);
        const result = new Message();
        const lettersOnly = message.separate(alphabet);

        for (let i = 0; i < lettersOnly.length; i += 1) {
            const c = lettersOnly.charAt(i);
            const cipherIndex = alphabet.toIndex(c.getValue());
            let plainIndex = cipherIndex - keyIndexes[i % keyIndexes.length];

            while (plainIndex < 0) {
                plainIndex += alphabet.letterOrder.upper.length;
            }

            c.setValue(alphabet.toLetter(plainIndex));
            result.append(c);

            if (options.autokey) {
                keyIndexes.push(plainIndex);
            }
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
        options = standardizeOptions(alphabet, options);
        const keyIndexes = makeKeyIndexes(alphabet, options.key);
        const result = new Message();
        const lettersOnly = message.separate(alphabet);

        for (let i = 0; i < lettersOnly.length; i += 1) {
            const c = lettersOnly.charAt(i);
            const plainIndex = alphabet.toIndex(c.getValue());
            let cipherIndex = plainIndex + keyIndexes[i % keyIndexes.length];
            cipherIndex %= alphabet.letterOrder.upper.length;
            c.setValue(alphabet.toLetter(cipherIndex));
            result.append(c);

            if (options.autokey) {
                keyIndexes.push(plainIndex);
            }
        }

        return message.overlay(alphabet, result);
    }
};
