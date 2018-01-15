"use strict";

var alphabets, util;

alphabets = require("../lib/alphabet/");
util = require("../lib/util/");

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


module.exports = (targetModule) => {
    var inMethod, outMethod;

    if (targetModule.encipher) {
        inMethod = "encipher";
        outMethod = "decipher";
    } else {
        inMethod = "encode";
        outMethod = "decode";
    }

    /**
     * Enciphers or encodes a message.
     *
     * @param {string} message
     * @param {(string|Function|Alphabet)} alphabet
     * @param {Object} [options]
     * @return {string}
     */
    function inTest(message, alphabet, options) {
        var result;

        message = new util.Message(message);
        alphabet = transformAlphabet(alphabet);
        result = targetModule[inMethod](message, alphabet, options);

        return result.toString();
    }

    /**
     * Deciphers or decodes a message.
     *
     * @param {string} message
     * @param {(string|Function|Alphabet)} alphabet
     * @param {Object} [options]
     * @return {string}
     */
    function outTest(message, alphabet, options) {
        var result;

        message = new util.Message(message);
        alphabet = transformAlphabet(alphabet);
        result = targetModule[outMethod](message, alphabet, options);

        return result.toString();
    }

    return {
        /**
         * Creates a set of tests to make sure content enciphers/encodes
         * and deciphers/decodes appropriately.
         *
         * @param {Object} config
         * @param {string} config.description
         * @param {string} config.outText
         * @param {string} config.inText
         * @param {(string|Function|Alphabet)} config.alphabet
         * @param {Object} [config.options]
         */
        both(config) {
            describe(outMethod, () => {
                it(config.description, () => {
                    expect(outTest(config.inText, config.alphabet, config.options)).toBe(config.outText);
                });
            });
            describe(inMethod, () => {
                it(config.description, () => {
                    expect(inTest(config.outText, config.alphabet, config.options)).toBe(config.inText);
                });
            });
        },
        in(config) {
            describe(config.description, () => {
                it(config.description, () => {
                    expect(inTest(config.outText, config.alphabet, config.options)).toBe(config.inText);
                });
            });
        },
        out(config) {
            describe(config.description, () => {
                it(config.description, () => {
                    expect(outTest(config.inText, config.alphabet, config.options)).toBe(config.outText);
                });
            });
        }
    };
};
