"use strict";

var alphabets, util;

alphabets = require("../../lib/alphabet/");
util = require("../../lib/util/");

/**
 * Accept either the name of an alphabet or an alphabet object as input.
 * Provide an Alphabet object as a response.
 *
 * @param {(string|Function|Alphabet)} Input
 * @return {Alphabet}
 */
function transformAlphabet(Input) {
    if (typeof Input === "string") {
        return new alphabets[Input]();
    }

    if (typeof Input === "function") {
        return new Input();
    }

    return Input;
}


module.exports = (cipherModule) => {
    /**
     * Deciphers a message.
     *
     * @param {string} message
     * @param {(string|Function|Alphabet)} alphabet
     * @param {Object} [options]
     * @return {string}
     */
    function decipher(message, alphabet, options) {
        var result;

        message = new util.Message(message);
        alphabet = transformAlphabet(alphabet);
        result = cipherModule.decipher(message, alphabet, options);

        return result.toString();
    }

    /**
     * Enciphers a message.
     *
     * @param {string} message
     * @param {(string|Function|Alphabet)} alphabet
     * @param {Object} [options]
     * @return {string}
     */
    function encipher(message, alphabet, options) {
        var result;

        message = new util.Message(message);
        alphabet = transformAlphabet(alphabet);
        result = cipherModule.encipher(message, alphabet, options);

        return result.toString();
    }

    return {
        /**
         * Creates a set of tests to make sure content enciphers and deciphers
         * appropriately.
         *
         * @param {Object} config
         * @param {string} config.description
         * @param {string} config.plaintext
         * @param {string} config.ciphertext
         * @param {(string|Function|Alphabet)} config.alphabet
         * @param {Object} [config.options]
         */
        bidirectionalTest(config) {
            describe("decipher", () => {
                it(config.description, () => {
                    expect(decipher(config.ciphertext, config.alphabet, config.options)).toBe(config.plaintext);
                });
            });
            describe("encipher", () => {
                it(config.description, () => {
                    expect(encipher(config.plaintext, config.alphabet, config.options)).toBe(config.ciphertext);
                });
            });
        },
        decipher,
        encipher
    };
};
