"use strict";

var cipherTest, rot13;

rot13 = require("../../lib/cipher/rot13");
cipherTest = require("./cipher-test")(rot13);

describe("rot13", () => {
    cipherTest.bidirectionalTest({
        description: "rotates English",
        plaintext: "abcXYZ123-_ß",
        ciphertext: "nopKLM123-_ß",
        alphabet: "English"
    });
    cipherTest.bidirectionalTest({
        description: "rotates Español",
        plaintext: "abcXYZ123-_ß",
        ciphertext: "nñoKLM123-_ß",
        alphabet: "Español"
    });
    cipherTest.bidirectionalTest({
        description: "rotates numbers",
        plaintext: "abcXYZ123-_ß",
        ciphertext: "nopKLM678-_ß",
        alphabet: "English",
        options: {
            rot5Numbers: true
        }
    });
    describe("translation tests", () => {
        it("deciphers", () => {
            expect(cipherTest.decipher("abcXYZ123-_ß", "Deutsche")).toBe("nopKLM123-_ff");
        });
        it("enciphers", () => {
            expect(cipherTest.encipher("abcXYZ123-_ß", "Deutsche")).toBe("nopKLM123-_ff");
        });
    });
});
