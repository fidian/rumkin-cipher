"use strict";

var letterFrequency;

letterFrequency = require("../../lib/util/letter-frequency");

describe("letterFrequency", () => {
    it("works with empty strings", () => {
        expect(letterFrequency("")).toEqual({});
    });
    it("starts at one", () => {
        expect(letterFrequency("abc")).toEqual({
            a: 1,
            b: 1,
            c: 1
        });
    });
    it("tallies each character", () => {
        expect(letterFrequency("Mary had a little lamb.")).toEqual({
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
});
