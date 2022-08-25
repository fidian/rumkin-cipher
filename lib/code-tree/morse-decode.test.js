"use strict";

const morseDecode = require("./morse-decode")();
const test = require("ava");

test("morseDecode", (t) => {
    t.deepEqual(morseDecode.get("-..."), {
        // The code for "new section" is "-...-"
        hasChild: true,
        // Does not get the lowercase B - prefers uppercase
        value: "B"
    });
    t.deepEqual(morseDecode.get("-----"), {
        value: "0"
    });
    t.deepEqual(morseDecode.get("...---.."), {
        // SOS procode has an extra dit
        hasChild: true
    });
});
