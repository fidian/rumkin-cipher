"use strict";

const sampleWordlist = require("./sample-wordlist");
const test = require("ava");
const Word = require("./word");

test("Word constructor", (t) => {
    const word = new Word("abc");

    t.is(word.isWord(), true);
    t.deepEqual(word.state(), {
        chars: "abc",
        words: []
    });
    word.setWords(sampleWordlist.getWordsForPattern(word.getPattern()));
    t.deepEqual(word.state(), {
        chars: "abc",
        words: ["BAT", "CAT", "OWL", "XYZ"]
    });
    t.is(word.isWord(), true);
});
