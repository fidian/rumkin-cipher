"use strict";

const helper = require("../helper-test")("morse");

helper.both({
    description: "empty string",
    alphabet: "English",
    plainText: "",
    cipherText: ""
});

helper.encipher({
    description: "A B C adds trailing space",
    alphabet: "English",
    plainText: "A B C",
    cipherText: ".- / -... / -.-. "
});

helper.decipher({
    description: "A B C without trailing space",
    alphabet: "English",
    plainText: "A B C",
    cipherText: ".- / -... / -.-."
});

helper.decipher({
    description: "A B C plus trailing space",
    alphabet: "English",
    plainText: "A B C",
    cipherText: ".- / -... / -.-. "
});

helper.encipher({
    description: "letters with Español",
    alphabet: "Español",
    plainText: "mño",
    cipherText: "-- --.-- --- "
});

helper.decipher({
    description: "letters with Español",
    alphabet: "Español",
    plainText: "MÑO",
    cipherText: "-- --.-- ---"
});

helper.encipher({
    description: "case insensitive",
    alphabet: "English",
    plainText: "eE tT",
    cipherText: ". . / - - "
});
