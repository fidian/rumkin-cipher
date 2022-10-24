/* Morse Code
 *
 * Dits, dahs, and different amounts of spaces (represented by spaces and
 * slashes) correspond to letters and spaces. Morse code is used to transmit a
 * message using a tone, pulses, light, or other means.
 */

"use strict";

const morseDecodeTree = require("../code-tree/morse-decode");
const morseEncodeTree = require("../code-tree/morse-encode");

module.exports = {
    /**
     * Convert Morse dots and dashes to plaintext.
     *
     * @param {Message} message
     * @return {Message}
     */
    decode(message) {
        const codeTree = morseDecodeTree();
        const result = message.recode(codeTree, {
            padRemoveCodedToCoded: " ",
            padRemoveCodedToUncoded: " ",
            padRemoveUncodedToCoded: " "
        });

        return result;
    },

    /**
     * Convert letters to the encoded binary of Baconian cipher.
     *
     * @param {Message} message
     * @return {Message}
     */
    encode(message) {
        const codeTree = morseEncodeTree();
        const result = message.recode(codeTree, {
            padAddCodedToCoded: " ",
            padAddCodedToUncoded: " ",
            padAddUncodedToCoded: " "
        });

        return result;
    }
};
