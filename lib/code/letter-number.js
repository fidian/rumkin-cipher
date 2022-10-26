/* Morse Code
 *
 * Dits, dahs, and different amounts of spaces (represented by spaces and
 * slashes) correspond to letters and spaces. Morse code is used to transmit a
 * message using a tone, pulses, light, or other means.
 */

"use strict";
const CodeTree = require("../util/code-tree");
const defaultOptions = require("../util/default-options");
const Message = require("../util/message");
const MessageChunk = require("../util/message-chunk");

/**
 * @typedef {Object} LetterNumberOptions
 * @property {string} [delimiter="-]
 * @property {boolean} [padWithZeros=false]
 */

/**
 * @param {?LetterNumberOptions} options
 * @return {LetterNumberOptions}
 */
function standardizeCodeOptions(options) {
    const safeOptions = defaultOptions(options, {
        delimiter: {
            type: "string",
            default: "-"
        },
        padWithZeros: {
            type: "boolean"
        }
    });

    return safeOptions;
}

module.exports = {
    /**
     * Convert Morse dots and dashes to plaintext.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {LetterNumberOptions} options
     * @return {Message}
     */
    decode(message, alphabet, options) {
        options = standardizeCodeOptions(options);
        const codeTree = new CodeTree();
        const alphabetLength = alphabet.length;
        const padCodeLength = options.padWithZeros ? alphabetLength.toString().length : 0;

        for (let i = 0; i < alphabetLength; i += 1) {
            let code = (i + 1).toString();

            while (code.length < padCodeLength) {
                code = `0${code}`;
            }

            codeTree.add(code, alphabet.toLetter(i));
        }

        const result = message.recode(codeTree, {
            padRemoveCodedToCoded: options.delimiter
        });

        return result;
    },

    /**
     * Convert letters to their numerical indexes.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {LetterNumberOptions} options
     * @return {Message}
     */
    encode(message, alphabet, options) {
        options = standardizeCodeOptions(options);
        const input = message.translate(alphabet);
        const codeTree = new CodeTree();
        const alphabetLength = alphabet.length;
        const padCodeLength = options.padWithZeros ? alphabetLength.toString().length : 0;

        for (const letters of Object.values(alphabet.letterOrder)) {
            for (let i = 0; i < alphabetLength; i += 1) {
                let code = (i + 1).toString();

                while (code.length < padCodeLength) {
                    code = `0${code}`;
                }

                codeTree.add(letters.charAt(i), code);
            }
        }

        const result = input.recode(codeTree, {
            padAddCodedToCoded: options.delimiter
        });

        return result;
    }
};
