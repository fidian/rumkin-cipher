"use strict";

const Pattern = require("./pattern");
const pattern = new Pattern();

module.exports = class Word {
    /**
     * Segment of non-word characters
     *
     * @param {string} chars
     * @param {Wordlist} wordlist
     */
    constructor(chars, wordlist) {
        this.chars = chars;
        this.pattern = pattern.patternFromWord(chars);
        this.availableWords = wordlist.getWordsForPattern(this.pattern);
    }

    /**
     * @return {true}
     */
    isWord() {
        return true;
    }

    /**
     * Changes the internal state to an object for easy testing.
     *
     * @return {Object}
     */
    state() {
        return {
            chars: this.chars,
            pattern: this.pattern,
            availableWords: this.availableWords
        };
    }
};
