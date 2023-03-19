"use strict";

const test = require("ava");
const Word = require("./word");

test("Word constructor", (t) => {
    const word = new Word("abc");

    t.deepEqual(word.state(), {
        chars: "abc",
        pattern: {
            distinctCount: 3,
            value: "ABC"
        }
    });
});
