"use strict";

const helper = require("../helper-test")("goldBug");

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
    cipherText: "5 2 -"
});
