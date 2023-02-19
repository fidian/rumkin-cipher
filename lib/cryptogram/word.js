"use strict";

const Pattern = require("./pattern");
const Wordlist = require("./wordlist");

module.exports = class Word {
    /**
     * Segment of non-word characters
     *
     * @param {string} chars
     * @param {Wordlist|Array.<string>} [wordlist]
     */
    constructor(chars, wordlist) {
        this.chars = chars;
        this.pattern = Pattern.patternFromWord(chars);

        if (wordlist instanceof Wordlist) {
            this.availableWords = wordlist.getWordsForPattern(this.pattern);
        } else if (Array.isArray(wordlist)) {
            this.availableWords = wordlist.slice();
        }
    }

    /**
     * Returns a copy of a word and wordlist
     *
     * @return {Word}
     */
    clone() {
        return new Word(this.chars, this.availableWords);
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
            pattern: this.pattern.state(),
            availableWords: this.availableWords
        };
    }
};
