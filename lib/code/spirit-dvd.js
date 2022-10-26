/**
 * Spirit DVD Code
 *
 * Bars and dots represent letters. Uses a system where longer codes are saved
 * for less used letters.
 */

"use strict";

const spiritDvdDecodeTree = require("../code-tree/spirit-dvd-decode");
const spiritDvdEncodeTree = require("../code-tree/spirit-dvd-encode");

module.exports = {
    /**
     * Convert Spirit DVD dots and dashes to plaintext.
     *
     * @param {Message} message
     * @return {Message}
     */
    decode(message) {
        const codeTree = spiritDvdDecodeTree();
        const result = message.recode(codeTree);

        return result;
    },

    /**
     * Convert letters to the dots and lines.
     *
     * @param {Message} message
     * @return {Message}
     */
    encode(message) {
        const codeTree = spiritDvdEncodeTree();
        const result = message.recode(codeTree);

        return result;
    }
};
