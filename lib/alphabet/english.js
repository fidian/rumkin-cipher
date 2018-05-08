"use strict";

var Alphabet;

Alphabet = require("./alphabet");

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
        this.updateIndexes();
    }
};
