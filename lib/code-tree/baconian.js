"use strict";

/**
 * Adds a letter mapping ("plaintext" -> "ciphertext") in reverse to make
 * a Baconian code tree ("ciphertext" -> "plaintext").
 *
 * @param {CodeTree} codeTree
 * @param {Object} map
 */
function addMap(codeTree, map) {
    var i, keys;

    keys = Object.keys(map);

    for (i = 0; i < keys.length; i += 1) {
        codeTree.add(map[keys[i]], keys[i]);
    }
}

const baconianMap = require("../alphabet-map/baconian");
const CodeTree = require("../util/code-tree");

module.exports = (alphabet) => {
    var codeTree;

    codeTree = new CodeTree();
    addMap(codeTree, baconianMap(alphabet, false));
    addMap(codeTree, baconianMap(alphabet, true));

    return codeTree;
};
