"use strict";

var Alphabet;

Alphabet = require("./alphabet");

module.exports = class AlphabetEspañol extends Alphabet {
    /**
     * Creates a Spanish alphabet.
     */
    constructor() {
        super();

        // Ñ is a proper letter in Spanish
        this.length = 27;
        this.letterOrder = {
            lower: "abcdefghijklmnñopqrstuvwxyz",
            upper: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
        };
        this.name = "Español";
    }
};
