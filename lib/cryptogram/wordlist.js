"use strict";

const Pattern = require("./pattern");
const pattern = new Pattern();
const upper = require("../util/upper");

module.exports = class Wordlistt {
    /**
     * @param {Array.<string>} words
     */
    constructor(words) {
        this.wordsByPattern = new Map();

        for (const word of words) {
            const wordUpper = upper(word);
            const pat = pattern.patternFromWord(wordUpper);
            const a = this.getWordsForPattern(pat);
            a.push(wordUpper);
        }
    }

    /**
     * @param {string} pat
     * @return {Array.<string>}
     */
    getWordsForPattern(pat) {
        let a = this.wordsByPattern.get(pat);

        if (!a) {
            a = [];
            this.wordsByPattern.set(pat, a);
        }

        return a;
    }
};
