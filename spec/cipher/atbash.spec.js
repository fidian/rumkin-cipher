"use strict";

var atbash, test;

atbash = require("../../lib/cipher/atbash");
test = require("../module-test")(atbash);

describe("atbash", () => {
    test.both({
        alphabet: "English",
        description: "changes low",
        inText: "old",
        outText: "low"
    });
    test.both({
        alphabet: "English",
        description: "happens to reverse wizard",
        inText: "draziw",
        outText: "wizard"
    });
    test.both({
        alphabet: "Español",
        description: "rotates Español",
        inText: "Vovkszngh",
        outText: "Elephants"
    });
});
