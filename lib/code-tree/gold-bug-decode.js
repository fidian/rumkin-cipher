/**
 * Decode Gold Bug
 */

"use strict";

const CodeTree = require("../util/code-tree");
const goldBugData = require("./gold-bug-data");

module.exports = () => {
    return new CodeTree().fromDataToDecodeTree(goldBugData);
};
