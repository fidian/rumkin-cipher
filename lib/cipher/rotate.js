"use strict";

/**
 * @typedef {Object} RotateOptions
 * @property {number} width How wide of a table to use. >= 1
 * @property {boolean} clockwise Rotate to right if true, left if false
 */

const Message = require("../util/message");
const MessageChunk = require("../util/message-chunk");

/**
 * Standardizes the options that are passed to encryption and decryption.
 *
 * @param {Object} [options]
 * @return {RotateOptions}
 */
function standardizeOptions(options) {
    if (typeof options !== "object" || !options) {
        options = {};
    }

    options.width = Math.max(+options.width, 1);

    if (options.width !== options.width) {
        options.width = 1;
    }

    options.clockwise = !!options.clockwise;

    return options;
}

module.exports = {
    /**
     * Deciphers a rotate cipher.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {RotateOptions} options
     * @return {Message}
     */
    decipher(message, alphabet, options) {
        options = standardizeOptions(options);
        const result = new Message();
        const lettersOnly = message.separate(alphabet);
        const padChunk = new MessageChunk(alphabet.padChar, [-1]);

        while (lettersOnly.length % options.width) {
            lettersOnly.append(padChunk);
        }

        let position;
        let width = lettersOnly.length / options.width;

        if (options.clockwise) {
            position = width - 1;
        } else {
            position = lettersOnly.length - width;
            width = -width;
        }

        while (result.length < lettersOnly.length) {
            result.append(lettersOnly.charAt(position));
            position += width;

            if (position < 0) {
                position += lettersOnly.length + 1;
            } else if (position >= lettersOnly.length) {
                position -= lettersOnly.length + 1;
            }
        }

        return message.overlay(alphabet, result);
    },


    /**
     * Enciphers a rotate cipher.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {RotateOptions} options
     * @return {Message}
     */
    encipher(message, alphabet, options) {
        options = standardizeOptions(options);
        const result = new Message();
        const lettersOnly = message.separate(alphabet);
        const padChunk = new MessageChunk(alphabet.padChar, [-1]);

        while (lettersOnly.length % options.width) {
            lettersOnly.append(padChunk);
        }

        let position, width;

        if (options.clockwise) {
            position = lettersOnly.length - options.width;
            width = -options.width;
        } else {
            position = options.width - 1;
            width = options.width;
        }

        while (result.length < lettersOnly.length) {
            result.append(lettersOnly.charAt(position));
            position += width;

            if (position < 0) {
                position += lettersOnly.length + 1;
            } else if (position >= lettersOnly.length) {
                position -= lettersOnly.length + 1;
            }
        }

        return message.overlay(alphabet, result);
    }
};
