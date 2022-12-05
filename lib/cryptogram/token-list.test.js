"use strict";

const NonWord = require("./non-word");
const sampleWordlist = require("./sample-wordlist");
const test = require("ava");
const TokenList = require("./token-list");

test("TokenList.add", (t) => {
    const tokenList = new TokenList();
    t.deepEqual(tokenList.state(), []);
    tokenList.add(new NonWord("ok"));
    t.deepEqual(tokenList.state(), ["ok"]);
});

test("TokenList.parseWords", (t) => {
    const tokenList = new TokenList();
    tokenList.parseWords("I see trees!", sampleWordlist);
    t.deepEqual(tokenList.state(), [
        {
            chars: "I",
            words: []
        },
        " ",
        {
            chars: "see",
            words: ["ROO", "ZOO"]
        },
        " ",
        {
            chars: "trees",
            words: ["WALLY"]
        },
        "!"
    ]);
});
