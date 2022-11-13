"use strict";

const NonWord = require("./non-word");
const test = require("ava");

test("NonWord constructor", (t) => {
    const nonWord = new NonWord("abc");

    t.is(nonWord.state(), "abc");
    t.is(nonWord.isWord(), false);
});
