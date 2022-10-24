"use strict";

const CodeTree = require("./code-tree");
const test = require("ava");

test("CodeTree", (t) => {
    const codeTree = new CodeTree();

    codeTree.add("in", "out");
    t.deepEqual(codeTree.get("i"), {
        hasChild: true,
        length: 1
    }, "Retrieves a partial result");
    t.deepEqual(codeTree.get("in"), {
        length: 2,
        value: "out"
    });

    codeTree.addObject({
        one: "111",
        two: "22",
        three: "3"
    });
    t.deepEqual(codeTree.get("one"), {
        length: 3,
        value: "111"
    });
    t.deepEqual(codeTree.get("two"), {
        length: 3,
        value: "22"
    });
    t.deepEqual(codeTree.get("three"), {
        length: 5,
        value: "3"
    });
});
