"use strict";

const Alphabet = require("../util/alphabet");

module.exports = class AlphabetEnglish extends Alphabet {
    /**
     * Creates an English alphabet.
     */
    constructor() {
        super();
        this.characterSets = {
            lower: "abcdefghijklmnopqrstuvwxyz",
            upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        };
        this.length = 26;
        this.letterOrder = {
            lower: "abcdefghijklmnopqrstuvwxyz",
            upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        };
        this.name = "English";
        this.padChar = "X";
        this.updateIndexes();
    }
};
