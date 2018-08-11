/**
 * Morse Code as a code tree. For deciphering only.
 */

"use strict";

var CodeTree, morse;

CodeTree = require("./code-tree");
morse = require("./morse-data");
module.exports = () => {
    var code, codeTree, i, keys, text;

    codeTree = new CodeTree();
    keys = Object.keys(morse);

    for (i = 0; i < keys.length; i += 1) {
        code = morse[keys[i]].code;
        text = morse[keys[i]].text;

        // Only add the first text possibility, none of the alternates.
        codeTree.add(code, text[0]);
    }

    return codeTree;
};
