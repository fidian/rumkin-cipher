"use strict";

const test = require("ava");
const WordDecipherList = require("./word-decipher-list");
const Word = require("./word");

test("WordOptionList constructor", (t) => {
    const word = new Word("abc");
    const wordOptionList = new WordDecipherList(word, ["CAT", "DOG"]);

    t.deepEqual(wordOptionList.state(), {
        availableDeciphers: ["CAT", "DOG"],
        word: {
            chars: "abc",
            pattern: {
                distinctCount: 3,
                value: "ABC"
            }
        }
    });
});
