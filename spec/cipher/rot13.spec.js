"use strict";

var alphabets, rot13, util;

alphabets = require("../../lib/alphabet/");
rot13 = require("../../lib/cipher/rot13");
util = require("../../lib/util/");

describe("rot13", () => {
    describe("decipher", () => {
    });
    describe("encipher", () => {
        /**
         * Run an encipher call
         *
         * @param {Alphabet} Alphabet
         * @param {Object} [options]
         * @return {string}
         */
        function encipher(Alphabet, options) {
            var message, result;

            message = new util.MessageString("abcXYZ123-_ß");
            result = rot13.encipher(message, new Alphabet(), options);

            return result.toString();
        }

        it("rotates", () => {
            expect(encipher(alphabets.English)).toBe("nopKLM123-_ß");
        });
        it("rotates with a string that should be translated", () => {
            expect(encipher(alphabets.Deutsche)).toBe("nopKLM123-_ff");
        });
        it("rotates with an odd number of letters in alphabet", () => {
            expect(encipher(alphabets.Español)).toBe("nñoKLM123-_ß");
        });
        it("rotates numbers too", () => {
            expect(encipher(alphabets.English, {
                rot5Numbers: true
            })).toBe("nopKLM123-_ß");
        });
    });
});
