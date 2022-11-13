"use strict";

const test = require("ava");
const Wordlist = require("./wordlist");

test("Wordlist", (t) => {
    // Tests that rely on specific patterns...
    const w = new Wordlist([
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen"
    ]);

    // Words are capitalized and their original order is preserved
    t.deepEqual(w.getWordsForPattern("ABC"), ["ONE", "TWO", "SIX", "TEN"]);
});
