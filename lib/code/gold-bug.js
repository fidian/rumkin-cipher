/**
 * Gold Bug
 */

"use strict";

const goldBugDecodeTree = require("../code-tree/gold-bug-decode");
const goldBugEncodeTree = require("../code-tree/gold-bug-encode");

module.exports = {
    /**
     * Convert Gold Bug symbols into text.
     *
     * @param {Message} message
     * @return {Message}
     */
    decode(message) {
        const codeTree = goldBugDecodeTree();
        const result = message.recode(codeTree);

        return result;
    },

    /**
     * Convert text into Gold Bug symbols
     *
     * @param {Message} message
     * @return {Message}
     */
    encode(message) {
        const codeTree = goldBugEncodeTree();
        const result = message.recode(codeTree);

        return result;
    }
};
