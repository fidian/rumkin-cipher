"use strict";

const NonWord = require("./non-word");
const Word = require("./word");

module.exports = class TokenList {
    /**
     * Makes a new list
     */
    constructor() {
        this.list = [];
    }

    /**
     * Adds a token
     *
     * @param {NonWord|Word} token
     */
    add(token) {
        this.list.push(token);
    }

    /**
     * Applies a map to reduce the number of possible words from the wordlists.
     *
     * @param {LetterMap} letterMap
     */
    applyLetterMap(letterMap) {
        let reprocess = true;

        while (reprocess) {
            reprocess = false;

            for (const token of this.list) {
                if (token.applyLetterMap(letterMap)) {
                    reprocess = true;
                }
            }
        }
    }

    /**
     * Returns a copy of a list
     *
     * @return {TokenList}
     */
    clone() {
        const copy = new TokenList();

        for (const token of this.list) {
            copy.add(token.clone());
        }

        return copy;
    }

    /**
     * Call a callback and return an array of the results
     *
     * @param {Function} cb
     * @return {Array}
     */
    map(cb) {
        const result = [];

        for (const token of this.list) {
            result.push(cb(token));
        }

        return result;
    }

    /**
     * Split a pnrase into words and non-words.
     *
     * @param {string} input
     * @param {Wordlist} wordlist
     * @return {Array.<Word|NonWord>}
     */
    parseWords(input, wordlist) {
        const segments = input
            .split(/(\P{Letter}+)/u)
            .filter((item) => item.length > 0);

        for (const segment of segments) {
            if (segment.match(/^\p{Letter}/u)) {
                const word = new Word(segment);
                word.setWords(wordlist.getWordsForPattern(word.getPattern()));

                this.add(word);
            } else {
                this.add(new NonWord(segment));
            }
        }
    }

    /**
     * Returns the state of the token list. Used by tests.
     *
     * @return {Array.<any>}
     */
    state() {
        return this.list.map((token) => token.state());
    }
};
