"use strict";

const letterFrequency = require("./letter-frequency");
const test = require("ava");

test("letterFrequency empty string", (t) => {
    t.deepEqual(letterFrequency(""), {});
});

test("letterFrequency starts at one", (t) => {
    t.deepEqual(letterFrequency("abc"), {
        a: 1,
        b: 1,
        c: 1
    });
});

test("letterFrequency tallies each character", (t) => {
    t.deepEqual(letterFrequency("Mary had a little lamb."), {
        " ": 4,
        ".": 1,
        M: 1,
        a: 4,
        b: 1,
        d: 1,
        e: 1,
        h: 1,
        i: 1,
        l: 3,
        m: 1,
        r: 1,
        t: 2,
        y: 1
    });
});
