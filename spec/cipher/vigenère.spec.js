"use strict";

var caesar, test;

caesar = require("../../lib/cipher/vigenère");
test = require("../module-test")(caesar);

describe("vigenère", () => {
    test.both({
        alphabet: "English",
        description: "works on empty strings",
        inText: "",
        options: {
            key: "Moose"
        },
        outText: ""
    });
    test.both({
        alphabet: "English",
        description: "Wikipedia",
        inText: "Lxfopv ef rnhr",
        options: {
            key: "Lemon"
        },
        outText: "Attack at dawn"
    });
    test.both({
        alphabet: "English",
        description: "Wikipedia 2",
        inText: "CSASTP kv siqut gqu CSASTPiuaqjb",
        options: {
            key: "ABCD"
        },
        outText: "CRYPTO is short for CRYPTOgraphy"
    });
});
