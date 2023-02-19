"use strict";

const Pattern = require("./pattern");
const test = require("ava");

test("Pattern.patternFromWord", (t) => {
    t.deepEqual(Pattern.patternFromWord("").state(), {
        distinctCount: 0,
        value: ""
    });
    t.deepEqual(Pattern.patternFromWord("ava").state(), {
        distinctCount: 2,
        value: "ABA"
    });
    t.deepEqual(Pattern.patternFromWord("Hello hello").state(), {
        distinctCount: 6,
        value: "ABCCDEFBCCD"
    });
});
