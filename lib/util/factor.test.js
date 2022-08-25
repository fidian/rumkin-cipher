"use strict";

const factor = require("./factor");
const test = require("ava");

test("factor", (t) => {
    t.deepEqual(factor(-1), []);
    t.deepEqual(factor(2), []);
    t.deepEqual(factor(12.23), []);
    t.deepEqual(factor(6), [2, 3]);
    t.deepEqual(factor(8), [2, 2, 2]);
    t.deepEqual(factor(24), [2, 2, 2, 3]);
    t.deepEqual(factor(97), []);
    t.deepEqual(factor(12345), [3, 5, 823]);
});
