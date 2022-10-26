"use strict";

const helper = require("../helper-test")("spiritDvd");

helper.both({
    description: "empty string",
    alphabet: null,
    plainText: "",
    cipherText: ""
});

helper.both({
    description: "A B C",
    alphabet: null,
    plainText: "A1B,C",
    cipherText: "-|-1|-|||-,||-||-"
});

helper.both({
    description: "word",
    alphabet: null,
    plainText: "AB C",
    cipherText: "-|-|-|||----||-||-"
});

helper.encipher({
    description: "case insensitive",
    alphabet: null,
    plainText: "ABC",
    cipherText: "-|-|-|||-||-||-"
});
