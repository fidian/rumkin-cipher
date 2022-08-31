"use strict";

const Alphabet = require("../util/alphabet");

module.exports = class AlphabetEspañol extends Alphabet {
    /**
     * Creates a Spanish alphabet.
     */
    constructor() {
        super();

        this.characterSets = {
            lower: "abcdefghijklmnñopqrstuvwxyz",
            upper: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
        };

        // Ñ is a proper letter in Spanish
        this.length = 27;
        this.letterOrder = {
            lower: "abcdefghijklmnñopqrstuvwxyz",
            upper: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
        };
        this.name = "Español";
        this.padChar = "X";
        this.updateIndexes();
    }
};
