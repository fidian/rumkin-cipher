"use strict";

const spiritDvdEncode = require("./spirit-dvd-encode")();
const test = require("ava");

test("spiritDvdEncode", (t) => {
    t.deepEqual(spiritDvdEncode.get("b"), {
        length: 1,
        value: "|-|||-"
    });
    t.deepEqual(spiritDvdEncode.get("B"), {
        length: 1,
        value: "|-|||-"
    });
    t.is(spiritDvdEncode.get("asdf"), null);
});
