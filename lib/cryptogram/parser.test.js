"use strict";

const Parser = require("./parser");
const sampleWordlist = require("./sample-wordlist");
const test = require("ava");

const parser = new Parser();

test("Parser.parseWords", (t) => {
    const parsed = parser.parseWords("I see trees!", sampleWordlist);
    t.deepEqual(
        parsed.map((item) => item.state()),
        [
            {
                chars: "I",
                pattern: "A",
                availableWords: []
            },
            " ",
            {
                chars: "see",
                pattern: "ABB",
                availableWords: ["ROO", "ZOO"]
            },
            " ",
            {
                chars: "trees",
                pattern: "ABCCD",
                availableWords: ["WALLY"]
            },
            "!"
        ]
    );
});
