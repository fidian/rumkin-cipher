"use strict";

const helper = require("../helper-test")("binary");

helper.both({
    description: "empty string",
    alphabet: null,
    plainText: "",
    cipherText: ""
});

helper.both({
    description: "A B C",
    alphabet: "English",
    plainText: "A b",
    cipherText: "010000010010000001100010"
});
