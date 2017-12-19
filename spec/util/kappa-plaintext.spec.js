"use strict";

var kappaPlaintext;

kappaPlaintext = require("../../lib/util/kappa-plaintext");

describe("kappaPlaintext", () => {
    it("works with an empty string", () => {
        expect(kappaPlaintext("")).toEqual(0);
    });
    it("still returns zero with a single character", () => {
        expect(kappaPlaintext("a")).toEqual(0);
    });
    it("returns 1 when all letters are the same", () => {
        expect(kappaPlaintext("aa")).toEqual(1);
    });
    it("calculates correctly with a slightly harder example", () => {
        expect(kappaPlaintext("aaab")).toEqual(0.5);
    });
    it("improves the score when more letters are used", () => {
        expect(kappaPlaintext("aaabaaabaaabaaab")).toEqual(0.6);
    });
    it("calculates correctly for a sentence", () => {
        expect(kappaPlaintext("MARYHADALITTLELAMBITSFLEECEASWHITEASSNOW")).toBeCloseTo(0.06282, 5);
    });
});
