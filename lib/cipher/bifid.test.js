"use strict";

const helper = require("../helper-test")("bifid");

helper.both({
    description: "empty input",
    alphabet: "English",
    plainText: "",
    cipherText: ""
});

helper.both({
    description: "Wikipedia example",
    alphabet: "English", // Z is dropped by default
    plainText: "Flee at once!",
    cipherText: "Hadm ab yexo!" // "Hadn aa zdsp!" is if you map J -> I correctly
});
