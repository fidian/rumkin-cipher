"use strict";

const helper = require("../helper-test")("atbash");

helper.both({
    description: "changes low",
    alphabet: "English",
    plainText: "low",
    cipherText: "old"
});

helper.both({
    description: "happens to reverse wizard",
    alphabet: "English",
    plainText: "wizard",
    cipherText: "draziw"
});

helper.both({
    description: "rotates Español",
    alphabet: "Español",
    plainText: "Elephants",
    cipherText: "Vovkszngh"
});
