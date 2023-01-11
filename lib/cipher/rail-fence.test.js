"use strict";

const helper = require("../helper-test")("railFence");

helper.both({
    description: "Wikipedia",
    alphabet: "English",
    options: {
        rails: 3
    },
    plainText: "WEAREDISCOVEREDRUNATONCE",
    cipherText: "WECRUOERDSOEERNTNEAIVDAC"
});

helper.both({
    description: "Wikipedia2",
    alphabet: "English",
    options: {
        rails: 6
    },
    plainText: "WEAREDISCOVEREDRUNATONCE",
    cipherText: "WVOEOETNACRACRSENEEIDUDR"
});

helper.both({
    description: "Complicated",
    alphabet: "English",
    options: {
        offset: 1
    },
    plainText: "Mary had a little lamb.",
    cipherText: "Aamd llm a aiebrh tlyt."
});

helper.both({
    description: "Symbols and spaces",
    alphabet: null,
    options: {
        rails: 4,
        offset: 3
    },
    plainText: "This has two spaces!",
    cipherText: "stai  wpchhsose!Ta s"
});

helper.both({
    description: "Moving capitalization",
    alphabet: "English",
    options: {
        keepCapitalization: true,
        rails: 5,
        offset: 0
    },
    plainText: "Hello, Mike!",
    cipherText: "Heekl, ilMo!"
});
