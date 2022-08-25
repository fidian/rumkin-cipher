"use strict";

const helper = require("../helper-test")("vigenère");

helper.both({
    description: "works on empty strings",
    alphabet: "English",
    options: {
        key: "Moose"
    },
    plainText: "",
    cipherText: ""
});

helper.both({
    description: "Wikipedia",
    alphabet: "English",
    options: {
        key: "Lemon"
    },
    plainText: "Attack at dawn",
    cipherText: "Lxfopv ef rnhr"
});

helper.both({
    description: "Wikipedia 2",
    alphabet: "English",
    options: {
        key: "ABCD"
    },
    plainText: "CRYPTO is short for CRYPTOgraphy",
    cipherText: "CSASTP kv siqut gqu CSASTPiuaqjb"
});

helper.both({
    description: "Invalid key",
    alphabet: "English",
    options: {
        key: "1"
    },
    plainText: "ace",
    cipherText: "ace"
});

helper.both({
    description: "Wikipedia autokey",
    alphabet: "English",
    options: {
        key: "QUEENLY",
        autokey: true
    },
    plainText: "attackatdawn",
    cipherText: "qnxepvytwtwp"
});
