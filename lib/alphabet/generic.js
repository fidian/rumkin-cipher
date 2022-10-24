"use strict";

/**
 * A generic alphabet is really not usable in many locations. It loses several
 * abilities that normal alphabets have, and that's because we're dealing with
 * all of the characters defined in Unicode instead of a handful that a
 * language uses.
 */

const Alphabet = require("../util/alphabet");

module.exports = class AlphabetGeneric extends Alphabet {
    /**
     * Creates an alphabet where everything is a letter.
     */
    constructor() {
        super();
        this.name = "Generic";
        this.padChar = "X";
        this.length = 1114112;

        for (const method of ["collapse", "keyAlphabetByIndexes", "keyWord", "updateIndexes"]) {
            this[method] = () => {
                throw new Error(
                    `${method} is not supported by a generic alphabet`
                );
            };
        }
    }

    /**
     * Create a copy of the current alphabet.
     *
     * @return {Alphabet}
     */
    clone() {
        return new AlphabetGeneric();
    }

    /**
     * Test if something is a letter (hint: they all are)
     *
     * @return {true}
     */
    isLetter() {
        return true;
    }

    /**
     * Do not match case with generic alphabet
     *
     * @param {string} referenceLetter Determines capitalization
     * @param {string} value
     * @return {string}
     */
    matchCase(referenceLetter, value) {
        return value;
    }

    /**
     * Return the index of the character
     *
     * @param {string} c
     * @return {number}
     */
    toIndex(c) {
        return c.charCodeAt(0);
    }

    /**
     * Convert an index back to a letter
     *
     * @param {number} i
     * @return {string}
     */
    toLetter(i) {
        return String.fromCharCode(i);
    }

    /**
     * Convert an index back to all letters.
     *
     * @param {number} i
     * @return {string}
     */
    toLetters(i) {
        return String.fromCharCode(i);
    }
};
