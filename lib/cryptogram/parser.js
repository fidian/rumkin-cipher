"use strict";

const NonWord = require("./non-word");
const Word = require("./word");

module.exports = class Parser {
    /**
     * Split a phrase into words and non-words. Return tne collection as an array.
     *
     * @param {string} input
     * @param {string[]} wordlist}
     * @return {Array.<Word|NonWord>}
     */
    parseWords(input, wordlist) {
        return input
            .split(/(\P{Letter}+)/u)
            .filter((item) => item.length > 0)
            .map((item) => {
                if (item.match(/^\p{Letter}/u)) {
                    return new Word(item, wordlist);
                }

                return new NonWord(item);
            });
    }
};
