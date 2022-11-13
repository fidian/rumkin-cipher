"use strict";

const Pattern = require("./pattern");
const test = require("ava");

const pattern = new Pattern();

test("Pattern.patternFromWord", (t) => {
    t.is(pattern.patternFromWord(""), "");
    t.is(pattern.patternFromWord("ava"), "ABA");
    t.is(pattern.patternFromWord("Hello hello"), "ABCCDEFBCCD");
});
