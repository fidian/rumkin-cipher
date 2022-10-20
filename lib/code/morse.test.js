"use strict";

const helper = require("../helper-test")("morse");

helper.both({
    description: "empty string",
    alphabet: "Generic",
    plainText: "",
    cipherText: ""
});

helper.both({
    description: "A B C adds trailing space",
    alphabet: "Generic",
    plainText: "A B C",
    cipherText: ".- / -... / -.-."
});

helper.both({
    description: "special letters",
    alphabet: "Generic",
    plainText: "MÑO",
    cipherText: "-- --.-- ---"
});

helper.both({
    description: "mixed letters and symbols 1",
    alphabet: "Generic",
    plainText: "A1##A1",
    cipherText: ".- .---- ## .- .----"
});

helper.both({
    description: "mixed letters and symbols 2",
    alphabet: "Generic",
    plainText: "##A1##",
    cipherText: "## .- .---- ##"
});

helper.encipher({
    description: "case insensitive",
    alphabet: "Generic",
    plainText: "eE tT",
    cipherText: ". . / - -"
});

helper.both({
    description: "prosign",
    alphabet: "Generic",
    plainText: "[SOS]",
    cipherText: "...---..."
});
