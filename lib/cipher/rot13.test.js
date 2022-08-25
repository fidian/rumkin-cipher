"use strict";

const helper = require("../helper-test")("rot13");

helper.both({
    description: "rotates English",
    alphabet: "English",
    plainText: "abcXYZ123-_ß",
    cipherText: "nopKLM123-_ß"
});

helper.both({
    description: "rotates Español",
    alphabet: "Español",
    plainText: "abcXYZ123-_ß",
    cipherText: "nñoKLM123-_ß"
});

helper.both({
    description: "rotates numbers",
    alphabet: "English",
    options: {
        rot5Numbers: true
    },
    plainText: "abcXYZ123-_ß",
    cipherText: "nopKLM678-_ß"
});

helper.decipher({
    description: "transatlates when decrypting",
    alphabet: "Deutsche",
    plainText: "nopKLM123-_ff",
    cipherText: "abcXYZ123-_ß"
});

helper.encipher({
    description: "transatlates when encrypting",
    alphabet: "Deutsche",
    plainText: "abcXYZ123-_ß",
    cipherText: "nopKLM123-_ff"
});
