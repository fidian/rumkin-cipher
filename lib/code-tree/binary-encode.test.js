"use strict";

const binaryEncode = require("./binary-encode")();
const test = require("ava");

test("binaryDecode", (t) => {
    t.deepEqual(binaryEncode.get("M"), {
        length: 1,
        value: "01001101"
    });
});
