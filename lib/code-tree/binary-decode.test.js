"use strict";

const binaryDecode = require("./binary-decode")();
const test = require("ava");

test("binaryDecode", (t) => {
    t.deepequal(binaryDecode.get("0010"), {
        hasChild: true,
        length: 4
    });
    t.deepEqual(binaryDecode.get("01001101"), {
        length: 8,
        value: "M"
    });
});
