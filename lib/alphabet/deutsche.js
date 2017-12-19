"use strict";

var Alphabet;

Alphabet = require("./alphabet");

module.exports = class AlphabetDeutsch extends Alphabet {
    /**
     * Creates a German alphabet.
     */
    constructor() {
        super();

        // ß is not part of the alphabet.
        this.length = 26;
        this.letterOrder = {
            lower: "abcdefghijklmnopqrstuvwxyz",
            upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        };

        // Accented letters map to base letters during ciphering.
        this.translations = {
            // Lower
            ä: "a",
            ö: "o",
            ß: "ss",
            ü: "u",

            // Upper
            Ä: "A",
            Ö: "O",
            ẞ: "SS",
            Ü: "U"
        };
        this.name = "Deutsche";
    }
};
