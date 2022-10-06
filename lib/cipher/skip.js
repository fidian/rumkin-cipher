"use strict";

/**
 * @typedef {Object} SkipOptions
 * @property {number} offset Start at this letter. 0 means to start at first, 1
 * means skip 1 at the beginning, etc.
 * @property {number} skip How many characters to skip. 0 means to skip no
 * characters. Must be coprime to the number of letters in the message.
 */

const coprime = require("../util/coprime");
const defaultOptions = require("../util/default-options");
const Message = require("../util/message");

/**
 * Standardizes the options that are passed to encryption and decryption.
 *
 * @param {Object} [options]
 * @return {SkipOptions}
 */
function standardizeOptions(options) {
    return defaultOptions(options, {
        offset: {
            type: "number",
            default: 0
        },
        skip: {
            type: "number",
            default: 0
        }
    });
}

module.exports = {
    /**
     * Deciphers a skip cipher.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {SkipOptions} options
     * @return {Message}
     */
    decipher(message, alphabet, options) {
        options = standardizeOptions(options);
        const result = new Message();
        const lettersOnly = message.separate(alphabet);

        if (!coprime(lettersOnly.length, options.skip + 1)) {
            return message.overlay(alphabet, lettersOnly);
        }

        // Find where the first and second letters get placed.
        let firstLetterPosition = -1;
        let secondLetterPosition = -1;
        let inputPosition = options.offset;
        const inputAdvancement = options.skip + 1;
        let outputPosition = 0;

        while (firstLetterPosition === -1 || secondLetterPosition === -1) {
            if (inputPosition === 0) {
                firstLetterPosition = outputPosition;
            } else if (inputPosition === 1) {
                secondLetterPosition = outputPosition;
            }

            inputPosition += inputAdvancement;
            inputPosition %= lettersOnly.length;
            outputPosition += 1;
        }

        const diff = secondLetterPosition - firstLetterPosition;
        const decodeCounter = diff > 0 ? diff : lettersOnly.length + diff;
        inputPosition = firstLetterPosition;

        while (result.length < lettersOnly.length) {
            result.append(lettersOnly.charAt(inputPosition));
            inputPosition += decodeCounter;
            inputPosition %= lettersOnly.length;
        }

        return message.overlay(alphabet, result);
    },

    /**
     * Enciphers a skip cipher.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {SkipOptions} options
     * @return {Message}
     */
    encipher(message, alphabet, options) {
        options = standardizeOptions(options);
        const result = new Message();
        const lettersOnly = message.separate(alphabet);

        if (!coprime(lettersOnly.length, options.skip + 1)) {
            return message.overlay(alphabet, lettersOnly);
        }

        let position = options.offset % lettersOnly.length;
        const advance = options.skip + 1;

        while (result.length < lettersOnly.length) {
            result.append(lettersOnly.charAt(position));
            position += advance;
            position %= lettersOnly.length;
        }

        return message.overlay(alphabet, result);
    }
};
