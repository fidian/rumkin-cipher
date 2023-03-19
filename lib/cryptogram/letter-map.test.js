"use strict";

const LetterMap = require("./letter-map");
const test = require("ava");

test("LetterMap constructor", (t) => {
    const letterMap = new LetterMap();

    t.deepEqual(letterMap.state(), {
        map: {},
        used: []
    });
});

test("LetterMap tracking a few letters", (t) => {
    const letterMap = new LetterMap();

    letterMap.set("t", "M");
    letterMap.set("e", "A");
    letterMap.set("s", "L");
    t.deepEqual(letterMap.state(), {
        map: {
            e: "A",
            s: "L",
            t: "M"
        },
        used: ["A", "L", "M"]
    });
});
