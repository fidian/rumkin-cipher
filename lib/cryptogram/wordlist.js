"use strict";

const Pattern = require("./pattern");
const upper = require("../util/upper");

module.exports = class Wordlist {
    /**
     * @param {Array.<string>} words
     */
    constructor(words) {
        this.wordsByPattern = new Map();

        for (const word of words) {
            const wordUpper = upper(word);
            const pattern = Pattern.patternFromWord(wordUpper);
            const a = this.getWordsForPattern(pattern);
            a.push(wordUpper);
        }
    }

    /**
     * @param {Pattern} pattern
     * @return {Array.<string>}
     */
    getWordsForPattern(pattern) {
        let a = this.wordsByPattern.get(pattern.value);

        if (!a) {
            a = [];
            this.wordsByPattern.set(pattern.value, a);
        }

        return a;
    }
};
