"use strict";

var Alphabet;

Alphabet = require("./alphabet");

module.exports = class AlphabetDeutsch extends Alphabet {
    /**
     * Creates a German alphabet.
     */
    constructor() {
        super();

        this.characterSets = {
            lower: "abcdefghijklmnopqrstuvwxyzäößü",
            upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖẞÜ"
        };

        // Umlauted letters and ß are not part of the alphabet.
        this.length = 26;
        this.letterOrder = {
            lower: "abcdefghijklmnopqrstuvwxyz",
            upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        };
        this.translations = {
            // Lower
            ä: "ae",
            ö: "oe",
            ß: "ss",
            ü: "ue",

            // Upper
            Ä: "AE",
            Ö: "OE",
            ẞ: "SS",
            Ü: "UE"
        };
        this.name = "Deutsche";
        this.updateIndexes();
    }
};
