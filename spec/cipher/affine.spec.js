"use strict";

var affine, test;

affine = require("../../lib/cipher/affine");
test = require("../module-test")(affine);

describe("affine", () => {
    test.both({
        alphabet: "English",
        description: "empty input",
        inText: "",
        outText: ""
    });
    test.both({
        alphabet: "English",
        description: "Wikipedia example",
        inText: "Ihhwvc Swfrcp",
        options: {
            multiplier: 5,
            shift: 8
        },
        outText: "Affine Cipher"
    });
});
