"use strict";

const helper = require("../helper-test")("affine");

helper.both({
    description: "empty input",
    alphabet: "English",
    plainText: "",
    cipherText: ""
});

helper.both({
    description: "Wikipedia example",
    alphabet: "English",
    options: {
        multiplier: 5,
        shift: 8
    },
    plainText: "Affine Cipher",
    cipherText: "Ihhwvc Swfrcp"
});

helper.both({
    description: "ASU Math Department",
    alphabet: "English",
    options: {
        multiplier: 3,
        shift: 7
    },
    plainText: "sail",
    cipherText: "jhfo"
});

helper.both({
    description: "Geeks for Geeks",
    alphabet: "English",
    options: {
        multiplier: 17,
        shift: 20
    },
    plainText: "twenty fifteen",
    cipherText: "fekhfm babfkkh"
});
