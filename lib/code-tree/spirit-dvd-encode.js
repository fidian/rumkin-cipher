/**
 * Spirit DVD code as a code tree. For enciphering only.
 */

"use strict";

const CodeTree = require("../util/code-tree");
const spiritDvdData = require("./spirit-dvd-data");

module.exports = () => {
    return new CodeTree().fromDataToEncodeTree(spiritDvdData);
};
