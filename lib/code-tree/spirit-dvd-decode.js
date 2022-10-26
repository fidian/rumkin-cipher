/**
 * Spirit DVD code as a code tree. For deciphering only.
 */

"use strict";

const CodeTree = require("../util/code-tree");
const spiritDvdData = require("./spirit-dvd-data");

module.exports = () => {
    return new CodeTree().fromDataToDecodeTree(spiritDvdData);
};
