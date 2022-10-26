/**
 * Binary (8-bit)
 */

"use strict";

const binaryDecodeTree = require("../code-tree/binary-decode");
const binaryEncodeTree = require("../code-tree/binary-encode");

module.exports = {
    /**
     * @param {Message} message
     * @return {Message}
     */
    decode(message) {
        const codeTree = binaryDecodeTree();
        const result = message.recode(codeTree);

        return result;
    },

    /**
     * @param {Message} message
     * @return {Message}
     */
    encode(message) {
        const codeTree = binaryEncodeTree();
        const result = message.recode(codeTree);

        return result;
    }
};
