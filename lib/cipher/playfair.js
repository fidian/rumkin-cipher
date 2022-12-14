"use strict";

const defaultOptions = require("../util/default-options");
const Message = require("../util/message");
const MessageChunk = require("../util/message-chunk");
const PolybiusSquare = require("../util/polybius-square");

/**
 * @typedef {Object} PlayfairOptions
 * @property {string} [doubles=PAD] PAD DOWN_RIGHT UNCHANGED REPLACE
 */

/**
 * Sanitize options
 *
 * @param {?PlayfairOptions} options
 * @return {PlayfairOptions}
 */
function standardizeCipherOptions(options) {
    const safeOptions = defaultOptions(options, {
        doubles: {
            type: "enum",
            enum: ["PAD", "DOWN_RIGHT", "UNCHANGED", "REPLACE"],
            default: "PAD"
        }
    });

    return safeOptions;
}

/**
 * Determine the padding characters to use for a given alphabet.
 *
 * @param {Alphabet} alphabet
 * @param {PolybiusSquare} square
 * @return {string}
 */
function findPadChars(alphabet, square) {
    if (alphabet) {
        const padIndex = alphabet.toIndex(alphabet.padChar);

        for (let i = alphabet.length - 1; i >= 0; i -= 1) {
            const c = alphabet.toLetter(i);

            if (alphabet.toIndex(c) !== padIndex && square.indexOf(c)) {
                return alphabet.padChar + c;
            }
        }
    }

    return "XQ";
}

/**
 * Return if two letters are the same
 *
 * @param {string} a
 * @param {string} b
 * @param {?Alphabet} alphabet
 * @return {boolean}
 */
function isSameChar(a, b, alphabet) {
    if (!alphabet) {
        return a.charAt(0) === b.charAt(0);
    }

    const aIndex = alphabet.toIndex(a.charAt(0));
    const bIndex = alphabet.toIndex(b.charAt(0));

    return aIndex === bIndex;
}

/**
 * Get a padding character that does not conflict with a letter
 *
 * @param {MessageChunk} letter
 * @param {string} padChars
 * @param {?Alphabet} alphabet
 * @return {MessageChunk}
 */
function getPaddingChar(letter, padChars, alphabet) {
    if (!isSameChar(letter.getValue(), padChars, alphabet)) {
        return new MessageChunk(padChars.charAt(0), letter.positions);
    }

    return new MessageChunk(padChars.charAt(1), letter.positions);
}

/**
 * Use a Polybius square to look up indexes and swap letters around.
 *
 * @param {PolybiusSquare} square
 * @param {MessageChunk} first
 * @param {MessageChunk} second
 * @param {number} direction
 * @return {MessageChunk}
 */
function useSquare(square, first, second, direction) {
    const firstPosition = square.indexOf(first.getValue());
    const secondPosition = square.indexOf(second.getValue());
    let moved = false;

    if (firstPosition[0] === secondPosition[0]) {
        // If letters are in the same row, replace with letters immediately to
        // their right.
        firstPosition[1] = square.limit(firstPosition[1] + direction);
        secondPosition[1] = square.limit(secondPosition[1] + direction);
        moved = true;
    }

    if (firstPosition[1] === secondPosition[1]) {
        // If letters are in the same column, replace with letters immediately
        // below.
        firstPosition[0] = square.limit(firstPosition[0] + direction);
        secondPosition[0] = square.limit(secondPosition[0] + direction);
        moved = true;
    }

    if (!moved) {
        // Slide the first letter sideways to the second letter's column, then
        // do the same for the second letter over to the first letter's column.
        const temp = firstPosition[1];
        firstPosition[1] = secondPosition[1];
        secondPosition[1] = temp;
    }

    const firstCoded = square.charAt(firstPosition[0], firstPosition[1]);
    const secondCoded = square.charAt(secondPosition[0], secondPosition[1]);
    const firstChunk = new MessageChunk(firstCoded, first.getPositions());
    const secondChunk = new MessageChunk(secondCoded, second.getPositions());

    return firstChunk.append(secondChunk);
}

/**
 * Recodes a message
 *
 * @param {Message} message
 * @param {PolybiusSquare} square
 * @param {number} direction
 * @param {Alphabet} alphabet
 * @param {PlayfairOptions} options
 * @return {Message}
 */
function recode(message, square, direction, alphabet, options) {
    const padChars = findPadChars(alphabet, square);
    let i = 0;
    const result = new Message();

    while (i < message.length) {
        const first = message.charAt(i);
        let second = message.charAt(i + 1);
        let unchangedFlag = false;

        if (!second.getValue()) {
            second = getPaddingChar(first, padChars, alphabet);
            i += 1;
        } else if (isSameChar(first.getValue(), second.getValue(), alphabet)) {
            if (options.doubles === "UNCHANGED") {
                unchangedFlag = true;
                i += 2;
            } else if (options.doubles === "DOWN_RIGHT") {
                i += 2;
            } else if (options.doubles === "REPLACE") {
                second = getPaddingChar(first, padChars, alphabet);
                i += 2;
            } else {
                // PAD - Insert a pad character and encode normally
                second = getPaddingChar(first, padChars, alphabet);
                i += 1;
            }
        } else {
            i += 2;
        }

        if (unchangedFlag) {
            result.append(first.append(second));
        } else {
            const encoded = useSquare(square, first, second, direction);
            result.append(encoded);
        }
    }

    return result;
}

module.exports = {
    /**
     * Deciphers a Playfair cipher
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {?PlayfairOptions} options
     * @return {Message}
     */
    decipher(message, alphabet, options) {
        options = standardizeCipherOptions(options);
        const translated = message.translate(alphabet);
        const lettersOnly = translated.separate(alphabet);
        const square = new PolybiusSquare(alphabet);
        const encoded = recode(lettersOnly, square, -1, alphabet, options);
        const result = message.overlay(alphabet, encoded);

        return result;
    },

    /**
     * Enciphers a Playfair cipher
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {?PlayfairOptions} options
     * @return {Message}
     */
    encipher(message, alphabet, options) {
        options = standardizeCipherOptions(options);
        const translated = message.translate(alphabet);
        const lettersOnly = translated.separate(alphabet);
        const square = new PolybiusSquare(alphabet);
        const encoded = recode(lettersOnly, square, +1, alphabet, options);
        const result = message.overlay(alphabet, encoded);

        return result;
    }
};
