"use strict";

const NonWord = require("./non-word");
const test = require("ava");
const TokenList = require("./token-list");

test("TokenList.add", (t) => {
    const tokenList = new TokenList();
    t.deepEqual(tokenList.state(), []);
    tokenList.add(new NonWord("ok"));
    t.deepEqual(tokenList.state(), ["ok"]);
});
