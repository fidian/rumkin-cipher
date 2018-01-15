"use strict";

var caesar, test;

caesar = require("../../lib/cipher/caesar");
test = require("../module-test")(caesar);

describe("caesar", () => {
    test.both({
        alphabet: "English",
        description: "rotates English",
        inText: "bcdYZA123-_ß",
        outText: "abcXYZ123-_ß"
    });
    test.both({
        alphabet: "Español",
        description: "rotates Español",
        inText: "mnñJKL123-_ß",
        options: {
            shift: 12
        },
        outText: "abcXYZ123-_ß"
    });
    test.out({
        alphabet: "Deutsche",
        description: "deciphers with a string that should be translated",
        inText: "abcXYZ123-_ß",
        outText: "zabWXY123-_rr"
    });
    test.in({
        alphabet: "Deutsche",
        description: "enciphers with a string that should be translated",
        inText: "bcdYZA123-_tt",
        outText: "abcXYZ123-_ß"
    });
});
