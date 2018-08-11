/**
 * Morse Code as a code tree. For enciphering only.
 */

"use strict";

var CodeTree, morse;

CodeTree = require("./code-tree");
morse = require("./morse-data");
module.exports = () => {
    var code, codeTree, i, j, keys, text;

    codeTree = new CodeTree();
    keys = Object.keys(morse);

    for (i = 0; i < keys.length; i += 1) {
        code = morse[keys[i]].code;
        text = morse[keys[i]].text;

        for (j = 0; j < text.length; j += 1) {
            codeTree.add(text[j], code);
        }
    }

    return codeTree;
};
