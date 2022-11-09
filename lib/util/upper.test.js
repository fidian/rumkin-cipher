"use strict";

const test = require("ava");
const upper = require("./upper");

test("upper", (t) => {
    t.is(upper("123"), "123");
    t.is(upper("aBcD"), "ABCD");
    t.is(upper("Tschuß"), "TSCHUẞ");
});
