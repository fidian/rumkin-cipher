"use strict";

const helper = require("../helper-test")("letterNumber");

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
    cipherText: "1 2 3"
});

helper.both({
    description: "special letters",
    alphabet: "Español",
    plainText: "NÑO",
    cipherText: "14-15-16"
});

helper.both({
    description: "mixed letters and symbols",
    alphabet: "English",
    plainText: "A#A",
    cipherText: "1#1"
});

helper.encipher({
    description: "mixed letters and numbers can cause confusion",
    alphabet: "English",
    plainText: "A-1",
    cipherText: "1-1"
});

helper.encipher({
    description: "case insensitive and space delimiter",
    alphabet: "English",
    options: {
        delimiter: " "
    },
    plainText: "aA bB",
    cipherText: "1 1 2 2"
});

helper.both({
    description: "padded with zeros",
    alphabet: "English",
    options: {
        padWithZeros: true
    },
    plainText: "TEST",
    cipherText: "20-05-19-20"
});

helper.both({
    description: "padded with zeros and no delimiter",
    alphabet: "English",
    options: {
        padWithZeros: true,
        delimiter: ""
    },
    plainText: "TEST",
    cipherText: "20051920"
});
