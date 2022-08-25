"use strict";

const CodeTree = require("./code-tree");
const test = require("ava");

test("CodeTree", (t) => {
    const codeTree = new CodeTree();

    codeTree.add("in", "out");
    t.deepEqual(codeTree.get("i"), {
        hasChild: true
    }, "Retrieves a partial result");
    t.deepEqual(codeTree.get("in"), {
        value: "out"
    });

    codeTree.addObject({
        one: "111",
        two: "22",
        three: "3"
    });
    t.deepEqual(codeTree.get("one"), {
        value: "111"
    });
    t.deepEqual(codeTree.get("two"), {
        value: "22"
    });
    t.deepEqual(codeTree.get("three"), {
        value: "3"
    });
});
