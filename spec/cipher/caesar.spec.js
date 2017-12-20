"use strict";

var caesar, cipherTest;

caesar = require("../../lib/cipher/caesar");
cipherTest = require("./cipher-test")(caesar);

describe("caesar", () => {
    cipherTest.bidirectionalTest({
        description: "rotates English",
        plaintext: "abcXYZ123-_ß",
        ciphertext: "bcdYZA123-_ß",
        alphabet: "English"
    });
    cipherTest.bidirectionalTest({
        description: "rotates Español",
        plaintext: "abcXYZ123-_ß",
        ciphertext: "mnñJKL123-_ß",
        alphabet: "Español",
        options: {
            shift: 12
        }
    });
    describe("translated characters", () => {
        it("deciphers with a string that should be translated", () => {
            expect(cipherTest.decipher("abcXYZ123-_ß", "Deutsche")).toBe("zabWXY123-_rr");
        });
        it("deciphers with a string that should be translated", () => {
            expect(cipherTest.encipher("abcXYZ123-_ß", "Deutsche")).toBe("bcdYZA123-_tt");
        });
    });
});
