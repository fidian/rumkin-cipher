"use strict";

module.exports = class WordDecipherList {
    /**
     * A word and its possible deciphers.
     *
     * @param {Word} word
     * @param {Array.<string>} availableDeciphers
     */
    constructor(word, availableDeciphers) {
        this.word = word;
        this.availableDeciphers = availableDeciphers.slice();
    }

    /**
     * Returns a copy
     *
     * @return {WordOptionList}
     */
    clone() {
        return new WordDecipherList(this.word, this.availableDeciphers);
    }

    /**
     * Changes the internal state to an object for easy testing.
     *
     * @return {Object}
     */
    state() {
        return {
            word: this.word.state(),
            availableDeciphers: this.availableDeciphers
        };
    }
};
