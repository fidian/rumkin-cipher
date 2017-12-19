"use strict";

var English, english, Español, español, indexOfCoincidence;

English = require("../../lib/alphabet/english");
Español = require("../../lib/alphabet/español");
english = new English();
español = new Español();
indexOfCoincidence = require("../../lib/util/index-of-coincidence");

describe("indexOfCoincidence", () => {
    it("works with an empty string", () => {
        expect(indexOfCoincidence("", english)).toEqual(0);
    });
    it("still returns zero with a single character", () => {
        expect(indexOfCoincidence("a", english)).toEqual(0);
    });
    it("returns 1 when all letters are the same", () => {
        expect(indexOfCoincidence("aa", english)).toEqual(26);
    });
    it("calculates correctly with a slightly harder example", () => {
        expect(indexOfCoincidence("aaab", english)).toEqual(13);
    });
    it("improves the score when more letters are used", () => {
        expect(indexOfCoincidence("aaabaaabaaabaaab", english)).toEqual(15.6);
    });
    it("calculates correctly for a sentence", () => {
        expect(indexOfCoincidence("MARYHADALITTLELAMBITSFLEECEASWHITEASSNOW", english)).toBeCloseTo(1.63333, 5);
    });
    it("shows a higher value when the language has more letters", () => {
        expect(indexOfCoincidence("MARYHADALITTLELAMBITSFLEECEASWHITEASSNOW", español)).toBeCloseTo(1.69615, 5);
    });
});
