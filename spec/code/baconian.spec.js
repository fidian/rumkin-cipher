"use strict";

var baconian, test;

baconian = require("../../lib/code/baconian");
test = require("../module-test")(baconian);

describe("baconian", () => {
    test.both({
        description: "empty string",
        inText: "",
        outText: "",
        alphabet: "English"
    });
    test.both({
        description: "binary",
        outText: "A B C",
        inText: "00000 00001 00010",
        alphabet: "English",
        options: {
            binary: true
        }
    });
    test.both({
        description: "letters with Español",
        outText: "MNO",
        inText: "abbaaabbababbbb",
        alphabet: "Español"
    });
    test.in({
        alphabet: "English",
        description: "encodes 'a b c' the same as 'A B C'",
        inText: "00000 00001 00010",
        options: {
            binary: true
        },
        outText: "a b c"
    });
});
