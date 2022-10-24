"use strict";

const morseEncode = require("./morse-encode")();
const test = require("ava");

test("morseEncode", (t) => {
    t.deepEqual(morseEncode.get("b"), {
        length: 1,
        value: "-..."
    });
    t.deepEqual(morseEncode.get("B"), {
        length: 1,
        value: "-..."
    });
    t.is(morseEncode.get("asdf"), null);
    t.deepEqual(morseEncode.get("[UNDERSTOOD]"), {
        length: 12,
        value: "...-."
    });
});
