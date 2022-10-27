"use strict";

const goldBugEncode = require("./gold-bug-encode")();
const test = require("ava");

test("goldBugEncode", (t) => {
    t.deepEqual(goldBugEncode.get("Q"), {
        length: 1,
        value: "$"
    });
    t.deepEqual(goldBugEncode.get("q"), {
        length: 1,
        value: "$"
    });
});
