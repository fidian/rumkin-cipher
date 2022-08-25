"use strict";

const alphabet = require("./alphabet/");
const cipher = require("./cipher/");
const code = require("./code/");
const test = require("ava");
const util = require("./util/");

/**
 * Accept either the name of an alphabet or an alphabet object as input.
 * Provide an Alphabet object as a response.
 *
 * @param {(string|Function|Alphabet)} Input
 * @return {Alphabet}
 */
function transformAlphabet(Input) {
    if (typeof Input === "string") {
        return new alphabet[Input]();
    }

    if (typeof Input === "function") {
        return new Input();
    }

    return Input;
}

module.exports = (targetModuleName) => {
    const targetModule = cipher[targetModuleName] || code[targetModuleName];
    const encipherMethod = targetModule.encipher ? "encipher" : "encode";
    const decipherMethod = targetModule.decipher ? "decipher" : "decode";

    /**
     * Enciphers or encodes a message.
     *
     * @param {string} message
     * @param {(string|Function|Alphabet)} messageAlphabet
     * @param {Object} [options]
     * @return {string}
     */
    function encipherTest(message, messageAlphabet, options) {
        var result;

        message = new util.Message(message);
        messageAlphabet = transformAlphabet(messageAlphabet);
        result = targetModule[encipherMethod](
            message,
            messageAlphabet,
            options
        );

        return result.toString();
    }

    /**
     * Deciphers or decodes a message.
     *
     * @param {string} message
     * @param {(string|Function|Alphabet)} messageAlphabet
     * @param {Object} [options]
     * @return {string}
     */
    function decipherTest(message, messageAlphabet, options) {
        var result;

        message = new util.Message(message);
        messageAlphabet = transformAlphabet(messageAlphabet);
        result = targetModule[decipherMethod](
            message,
            messageAlphabet,
            options
        );

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
            this.encipher(config);
            this.decipher(config);
        },
        decipher(config) {
            test(`${targetModuleName} ${decipherMethod} ${config.description}`, (t) => {
                t.is(
                    decipherTest(
                        config.cipherText,
                        config.alphabet,
                        config.options
                    ),
                    config.plainText
                );
            });
        },
        encipher(config) {
            test(`${targetModuleName} ${encipherMethod} ${config.description}`, (t) => {
                t.is(
                    encipherTest(
                        config.plainText,
                        config.alphabet,
                        config.options
                    ),
                    config.cipherText
                );
            });
        }
    };
};
