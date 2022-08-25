"use strict";

const prime = require("./prime");
const test = require("ava");

test("prime", (t) => {
    // Keep all numbers under 10000
    t.false(prime(0));
    t.false(prime(1));
    t.true(prime(2));
    t.true(prime(97));
    t.false(prime(6));
    t.false(prime(8));
    t.true(prime(1237));
});

test("prime returns a cached array of primes that expands", (t) => {
    t.deepEqual(
        prime(),
        [
            2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61,
            67, 71, 73, 79, 83, 89, 97
        ]
    );
    // Must not be even
    prime(11103);
    t.deepEqual(
        prime(),
        [
            2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61,
            67, 71, 73, 79, 83, 89, 97, 101, 103, 107
        ]
    );
});
