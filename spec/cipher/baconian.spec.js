"use strict";

var baconian, cipherTest;

baconian = require("../../lib/cipher/baconian");
cipherTest = require("./cipher-test")(baconian);

describe("baconian", () => {
    cipherTest.bidirectionalTest({
        description: "empty string",
        plaintext: "",
        ciphertext: "",
        alphabet: "English"
    });
    cipherTest.bidirectionalTest({
        description: "binary",
        plaintext: "A B C",
        ciphertext: "00000 00001 00010",
        alphabet: "English",
        options: {
            binary: true
        }
    });
    cipherTest.bidirectionalTest({
        description: "letters with Español",
        plaintext: "MNO",
        ciphertext: "abbaaabbababbbb",
        alphabet: "Español"
    });
    describe("lowercase", () => {
        it("encodes 'a b c' the same as 'A B C'", () => {
            expect(cipherTest.encipher("a b c", "English", {
                binary: true
            })).toBe("00000 00001 00010");
        });
    });
});
