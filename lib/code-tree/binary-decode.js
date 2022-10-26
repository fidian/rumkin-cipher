/**
 * Binary for characters from 0x00 to 0xFF
 */

"use strict";

const CodeTree = require("../util/code-tree");

module.exports = () => {
    const codeTree = new CodeTree();

    for (let i = 0; i < 255; i += 1) {
        codeTree.add(
            `0000000${i.toString(2)}`.substr(-8),
            String.fromCharCode(i)
        );
    }

    return codeTree;
};
