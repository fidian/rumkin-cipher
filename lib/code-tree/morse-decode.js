/**
 * Morse Code as a code tree. For deciphering only.
 */

"use strict";

const CodeTree = require("../util/code-tree");
const morseData = require("./morse-data");

module.exports = () => {
    return new CodeTree().fromDataToDecodeTree(morseData);
};
