"use strict";

const Pattern = require("./pattern");

module.exports = class Word {
    /**
     * Segment of non-word characters
     *
     * @param {string} chars
     */
    constructor(chars) {
        this.chars = chars;
        this.pattern = Pattern.patternFromWord(chars);
    }

    /**
     * Returns a copy of a word
     *
     * @return {Word}
     */
    clone() {
        const word = new Word(this.chars);

        return word;
    }

    /**
     * Changes the internal state to an object for easy testing.
     *
     * @return {Object}
     */
    state() {
        return {
            chars: this.chars,
            pattern: this.pattern.state()
        };
    }
};
