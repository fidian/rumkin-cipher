"use strict";

const goldBugDecode = require("./gold-bug-decode")();
const test = require("ava");

test("goldBugDecode", (t) => {
    t.deepEqual(goldBugDecode.get("$"), {
        length: 1,
        value: "Q"
    });
});
