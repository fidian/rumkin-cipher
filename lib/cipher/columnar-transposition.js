"use strict";

/**
 * @typedef {Object} ColumnarTranspositionOptions
 * @property {Array.<number>} columnKey List of column indexes. 0-based
 * indexing, must not have duplicates, must list all numbers from 0 to
 * (columnKey.length - 1).
 */

var Message;

Message = require("../util/message");

/**
 * Standardizes the options that are passed to encryption and decryption.
 *
 * @param {Object} [options]
 * @return {ColumnarTranspositionOptions}
 */
function standardizeOptions(options) {
    if (typeof options !== "object" || !options) {
        options = {};
    }

    if (!Array.isArray(options.columnKey)) {
        options.columnKey = [];
    }

    if (options.columnKey.length === 0) {
        options.columnKey.push(0);
    }

    return options;
}

module.exports = {
    /**
     * Deciphers a Columnar Transposition cipher.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {ColumnarTranspositionOptions} options
     * @return {Message}
     */
    decipher(message, alphabet, options) {
        var chunk, columnCount, columns, extra, i, lettersOnly, pos, result, size, targetColumn;

        options = standardizeOptions(options);
        result = new Message();
        lettersOnly = message.separate(alphabet);
        columns = [];
        columnCount = options.columnKey.length;

        // Determine column lengths
        size = Math.floor(lettersOnly.length / columnCount);
        extra = lettersOnly.length % columnCount;
        pos = 0;

        for (i = 0; i < columnCount; i += 1) {
            targetColumn = options.columnKey[i];

            if (extra) {
                columns[targetColumn] = size + 1;
                extra -= 1;
            } else {
                columns[targetColumn] = size;
            }
        }

        // Copy the necessary characters
        for (i = 0; i < columnCount; i += 1) {
            size = columns[i];
            columns[i] = [];

            while (columns[i].length < size) {
                columns[i].push(lettersOnly.charAt(pos));
                pos += 1;
            }
        }

        // Read out the message
        while (columns[options.columnKey[0]].length) {
            for (i = 0; i < columnCount; i += 1) {
                chunk = columns[options.columnKey[i]].shift();

                if (chunk) {
                    result.append(chunk);
                }
            }
        }

        result = message.overlay(alphabet, result);

        return result;
    },


    /**
     * Enciphers a Columnar Transposition cipher.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {ColumnarTranspositionOptions} options
     * @return {Message}
     */
    encipher(message, alphabet, options) {
        var columnCount, columns, i, lettersOnly, result, shuffled;

        options = standardizeOptions(options);
        result = new Message();
        lettersOnly = message.separate(alphabet);
        columns = [];
        shuffled = [];
        columnCount = options.columnKey.length;

        for (i = 0; i < columnCount; i += 1) {
            columns[i] = [];

            // Have another pointer to the same array for easy shuffling.
            shuffled[options.columnKey[i]] = columns[i];
        }

        for (i = 0; i < message.length; i += 1) {
            columns[i % columnCount].push(lettersOnly.charAt(i));
        }

        // Read the message back out.
        for (i = 0; i < columnCount; i += 1) {
            while (shuffled[i].length) {
                result.append(shuffled[i].shift());
            }
        }

        result = message.overlay(alphabet, result);

        return result;
    }
};
