"use strict";

const helper = require("../helper-test")("baconian");

helper.both({
    description: "empty string",
    alphabet: "English",
    plainText: "",
    cipherText: ""
});

helper.both({
    description: "binary",
    alphabet: "English",
    options: {
        binary: true
    },
    plainText: "A B C",
    cipherText: "00000 00001 00010"
});

helper.both({
    description: "letters with Español",
    alphabet: "Español",
    plainText: "MNO",
    cipherText: "abbaaabbababbbb"
});

helper.encipher({
    description: "encodes 'a b c' the same as 'A B C'",
    alphabet: "English",
    options: {
        binary: true
    },
    plainText: "a b c",
    cipherText: "00000 00001 00010"
});
