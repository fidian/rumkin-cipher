"use strict";

const helper = require("../helper-test")("rotate");

helper.both({
    description: "No width",
    alphabet: "English",
    options: {
    },
    plainText: "Testing this",
    cipherText: "Testing this"
});

helper.both({
    description: "Bad width number",
    alphabet: "English",
    options: {
        width: -1
    },
    plainText: "Testing this too",
    cipherText: "Testing this too"
});

helper.encipher({
    description: "Padding",
    alphabet: "English",
    options: {
        width: 4
    },
    plainText: "ABCDEFGHIJ",
    cipherText: "DHXCGXBFJAEI"
});

helper.decipher({
    description: "Padding",
    alphabet: "English",
    options: {
        width: 4
    },
    plainText: "ABCDEFGHIJXX", // Same as above, but with padding
    cipherText: "DHXCGXBFJAEI"
});

helper.encipher({
    description: "Clockwise",
    alphabet: "English",
    options: {
        clockwise: true,
        width: 4
    },
    plainText: "ABCDEFGHIJK",
    cipherText: "IEAJFBKGCXHD"
});

helper.decipher({
    description: "Clockwise",
    alphabet: "English",
    options: {
        clockwise: true,
        width: 4
    },
    plainText: "ABCDEFGHIJKX", // Same as above, but with padding
    cipherText: "IEAJFBKGCXHD"
});
