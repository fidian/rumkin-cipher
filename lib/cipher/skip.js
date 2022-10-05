"use strict";

/**
 * @typedef {Object} SkipOptions
 * @property {number} skip How many characters to skip. 0 means to skip no
 * characters. Must be coprime to the number of letters in the message.
 */

const Message = require("../util/message");
const coprime = require("../util/coprime");

/**
 * Standardizes the options that are passed to encryption and decryption.
 *
 * @param {Object} [options]
 * @return {SkipOptions}
 */
function standardizeOptions(options) {
    if (typeof options !== "object" || !options) {
        options = {};
    }

    options.skip = Math.max(+options.skip, 0);

    return options;
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

        let decodeCounter = 0;
        const advance = options.skip + 1;
        let position = 0;

        // Determine the amount to skip for decode
        while (position !== 1) {
            decodeCounter += 1;
            position += advance;
            position %= lettersOnly.length;
        }

        position = 0;

        while (result.length < lettersOnly.length) {
            result.append(lettersOnly.charAt(position));
            position += decodeCounter;
            position %= lettersOnly.length;
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

        let position = 0;
        const advance = options.skip + 1;

        while (result.length < lettersOnly.length) {
            result.append(lettersOnly.charAt(position));
            position += advance;
            position %= lettersOnly.length;
        }

        return message.overlay(alphabet, result);
    }
};
