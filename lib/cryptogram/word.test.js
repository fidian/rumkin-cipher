"use strict";

const sampleWordlist = require("./sample-wordlist");
const test = require("ava");
const Word = require("./word");

test("Word constructor", (t) => {
    const word = new Word("abc", sampleWordlist);

    t.deepEqual(word.state(), {
        chars: "abc",
        pattern: {
            distinctCount: 3,
            value: "ABC"
        },
        availableWords: ["BAT", "CAT", "OWL", "XYZ"]
    });
    t.is(word.isWord(), true);
});
