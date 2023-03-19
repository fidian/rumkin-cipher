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
                availableDeciphers: [],
                word: {
                    chars: "I",
                    pattern: {
                        distinctCount: 1,
                        value: "A"
                    }
                }
            },
            " ",
            {
                availableDeciphers: ["ROO", "ZOO"],
                word: {
                    chars: "see",
                    pattern: {
                        distinctCount: 2,
                        value: "ABB"
                    }
                }
            },
            " ",
            {
                availableDeciphers: ["WALLY"],
                word: {
                    chars: "trees",
                    pattern: {
                        distinctCount: 4,
                        value: "ABCCD"
                    }
                }
            },
            "!"
        ]
    );
});
