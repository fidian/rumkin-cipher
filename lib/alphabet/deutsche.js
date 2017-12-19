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
