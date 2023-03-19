"use strict";

const NonWord = require("./non-word");
const TokenList = require("./token-list");
const Word = require("./word");
const WordDecipherList = require("./word-decipher-list");

module.exports = class Parser {
    /**
     * Split a phrase into WordDecipherList objects (which contain Word objects)
     * and NonWord objects. Return tne collection as an array.
     *
     * @param {string} input
     * @param {string[]} wordlist}
     * @return {TokenList}
     */
    parseWords(input, wordlist) {
        const tokenList = new TokenList();

        const segments = input
            .split(/(\P{Letter}+)/u)
            .filter((item) => item.length > 0);

        for (const segment of segments) {
            if (segment.match(/^\p{Letter}/u)) {
                const word = new Word(segment);
                const options = wordlist.getWordsForPattern(word.pattern);
                const wordDecipherList = new WordDecipherList(word, options);
                tokenList.add(wordDecipherList);
            } else {
                tokenList.add(new NonWord(segment));
            }
        }

        return tokenList;
    }
};
