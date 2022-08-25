"use strict";

const helper = require("../helper-test")("caesar");

helper.both({
    description: "rotates English",
    alphabet: "English",
    plainText: "abcXYZ123-_ß",
    cipherText: "bcdYZA123-_ß"
});

helper.both({
    description: "rotates Español",
    alphabet: "Español",
    options: {
        shift: 12
    },
    plainText: "abcXYZ123-_ß",
    cipherText: "mnñJKL123-_ß"
});

helper.decipher({
    description: "deciphers with a string that should be translated",
    alphabet: "Deutsche",
    plainText: "zabWXY123-_rr",
    cipherText: "abcXYZ123-_ß"
});

helper.encipher({
    description: "enciphers with a string that should be translated",
    alphabet: "Deutsche",
    plainText: "abcXYZ123-_ß",
    cipherText: "bcdYZA123-_tt"
});
