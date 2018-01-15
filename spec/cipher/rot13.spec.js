"use strict";

var rot13, test;

rot13 = require("../../lib/cipher/rot13");
test = require("../module-test")(rot13);

describe("rot13", () => {
    test.both({
        alphabet: "English",
        description: "rotates English",
        inText: "nopKLM123-_ß",
        outText: "abcXYZ123-_ß"
    });
    test.both({
        alphabet: "Español",
        description: "rotates Español",
        inText: "nñoKLM123-_ß",
        outText: "abcXYZ123-_ß"
    });
    test.both({
        alphabet: "English",
        description: "rotates numbers",
        inText: "nopKLM678-_ß",
        options: {
            rot5Numbers: true
        },
        outText: "abcXYZ123-_ß"
    });
    test.out({
        alphabet: "Deutsche",
        description: "transatlates when encrypting",
        inText: "abcXYZ123-_ß",
        outText: "nopKLM123-_ff"
    });
    test.in({
        alphabet: "Deutsche",
        description: "transatlates when decrypting",
        inText: "nopKLM123-_ff",
        outText: "abcXYZ123-_ß"
    });
});
