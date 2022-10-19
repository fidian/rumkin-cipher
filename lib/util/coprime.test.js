"use strict";

const coprime = require("./coprime");
const test = require("ava");

test("coprime", (t) => {
    t.true(coprime(10, -1), "negative numbers");
    t.true(coprime(10, 1), "passed 1");
    t.false(coprime(10, 2));
    t.false(coprime(6, 9));
    t.true(coprime(7, 97));
    t.true(coprime(26, 15));
    t.true(coprime(0, 2), "zero");
    t.true(coprime(2, 0), "zero");
});
