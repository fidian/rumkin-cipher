"use strict";

var atbash, cipherTest;

atbash = require("../../lib/cipher/atbash");
cipherTest = require("./cipher-test")(atbash);

describe("atbash", () => {
    cipherTest.bidirectionalTest({
        description: "changes low",
        plaintext: "low",
        ciphertext: "old",
        alphabet: "English"
    });
    cipherTest.bidirectionalTest({
        description: "happens to reverse wizard",
        plaintext: "wizard",
        ciphertext: "draziw",
        alphabet: "English"
    });
    cipherTest.bidirectionalTest({
        description: "rotates Español",
        plaintext: "Elephants",
        ciphertext: "Vovkszngh",
        alphabet: "Español"
    });
});
