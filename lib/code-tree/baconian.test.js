"use strict";

const English = require("../alphabet/english");
const alphabet = new English();
const baconian = require("./baconian")(alphabet);
const test = require("ava");

test("baconian", (t) => {
    t.deepEqual(baconian.get("aaaba"), {
        length: 5,
        value: "C"
    });
    t.deepEqual(baconian.get("00010"), {
        length: 5,
        value: "C"
    });
});
