"use strict";

var affine, cipherTest;

affine = require("../../lib/cipher/affine");
cipherTest = require("./cipher-test")(affine);

describe("affine", () => {
    cipherTest.bidirectionalTest({
        description: "empty input",
        plaintext: "",
        ciphertext: "",
        alphabet: "English"
    });
    cipherTest.bidirectionalTest({
        description: "Wikipedia example",
        plaintext: "Affine Cipher",
        ciphertext: "Ihhwvc Swfrcp",
        alphabet: "English",
        options: {
            multiplier: 5,
            shift: 8
        }
    });
});
