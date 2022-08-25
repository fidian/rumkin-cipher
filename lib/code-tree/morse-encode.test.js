"use strict";

const morseEncode = require("./morse-encode")();
const test = require("ava");

test("morseEncode", (t) => {
    t.deepEqual(morseEncode.get("b"), {
        value: "-..."
    });
    t.deepEqual(morseEncode.get("B"), {
        value: "-..."
    });
    t.is(morseEncode.get("asdf"), null);
    t.deepEqual(morseEncode.get("[UNDERSTOOD]"), {
        value: "...-."
    });
});
