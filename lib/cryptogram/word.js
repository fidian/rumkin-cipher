"use strict";

const Pattern = require("./pattern");
const pattern = new Pattern();

module.exports = class Word {
    /**
     * Segment of non-word characters
     *
     * @param {string} chars
     */
    constructor(chars) {
        this.chars = chars;
        this.words = [];
    }

    /**
     * Return a copy of the instance
     *
     * @return {NonWord}
     */
    clone() {
        return new Word(this.chars);
    }

    /**
     * @return {true}
     */
    isWord() {
        return true;
    }

    /**
     * Gets the wor's pattern
     *
     * @return {string}
     */
    getPattern() {
        return pattern.patternFromWord(this.chars);
    }

    /**
     * Set the list of available words
     *
     * @param {Array.<string>} words
     */
    setWords(words) {
        this.words = words;
    }

    /**
     * Changes the internal state to an object for easy testing.
     *
     * @return {Object}
     */
    state() {
        return {
            chars: this.chars,
            words: this.words
        };
    }
};
