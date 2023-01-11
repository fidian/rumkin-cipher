"use strict";

/**
 * @typedef {Object} RotateOptions
 * @property {boolean} clockwise Rotate to right if true, left if false
 * @property {boolean} [keepCapitalization=false] Keep capitalization of the
 *     letter when moving the letter.
 * @property {number} [width=1] How wide of a table to use. >= 1
 */

const defaultOptions = require("../util/default-options");
const Message = require("../util/message");
const MessageChunk = require("../util/message-chunk");

/**
 * Standardizes the options that are passed to encryption and decryption.
 *
 * @param {Object} [options]
 * @return {RotateOptions}
 */
function standardizeOptions(options) {
    const safeOptions = defaultOptions(options, {
        clockwise: {
            type: "boolean"
        },
        keepCapitalization: {
            type: "boolean"
        },
        width: {
            type: "integer",
            default: 1
        }
    });

    safeOptions.width = Math.max(safeOptions.width, 1);

    return safeOptions;
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

        return message.overlay(alphabet, result, {
            keepCapitalization: options.keepCapitalization
        });
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

        return message.overlay(alphabet, result, {
            keepCapitalization: options.keepCapitalization
        });
    }
};
