/**
 * Morse Code as a code tree. For deciphering only.
 */

"use strict";

const CodeTree = require("../util/code-tree");
const morseData = require("./morse-data");

module.exports = () => {
    const codeTree = new CodeTree();

    for (const v of Object.values(morseData)) {
        // Only add the first text possibility, none of the alternates.
        codeTree.add(v.code, v.text[0]);
    }

    return codeTree;
};
