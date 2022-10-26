"use strict";

const spiritDvdDecode = require("./spirit-dvd-decode")();
const test = require("ava");

test("spiritDvdDecode", (t) => {
    t.deepEqual(spiritDvdDecode.get("||-"), {
        // This is an extended code.
        hasChild: true,
        length: 3
    });
    t.deepEqual(spiritDvdDecode.get("---"), {
        length: 3,
        value: " "
    });
});
