"use strict";

const helper = require("../helper-test")("morse");

helper.both({
    description: "empty string",
    alphabet: "English",
    plainText: "",
    cipherText: ""
});

helper.both({
    description: "A B C",
    alphabet: "English",
    plainText: "A B C",
    cipherText: ".- / -... / -.-."
});

helper.both({
    description: "special letters",
    alphabet: "English",
    plainText: "MÑO",
    cipherText: "-- --.-- ---"
});

helper.both({
    description: "mixed letters and symbols 1",
    alphabet: "English",
    plainText: "A1##A1",
    cipherText: ".- .---- ## .- .----"
});

helper.both({
    description: "mixed letters and symbols 2",
    alphabet: "English",
    plainText: "##A1##",
    cipherText: "## .- .---- ##"
});

helper.encipher({
    description: "case insensitive",
    alphabet: "English",
    plainText: "eE tT",
    cipherText: ". . / - -"
});

helper.both({
    description: "prosign",
    alphabet: "English",
    plainText: "[SOS]",
    cipherText: "...---..."
});
