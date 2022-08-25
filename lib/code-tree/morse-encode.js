/**
 * Morse Code as a code tree. For enciphering only.
 */

"use strict";

const CodeTree = require("./code-tree");
const morseData = require("./morse-data");

module.exports = () => {
    const codeTree = new CodeTree();

    for (const v of Object.values(morseData)) {
        for (const text of v.text) {
            codeTree.add(text, v.code);
        }
    }

    return codeTree;
};
