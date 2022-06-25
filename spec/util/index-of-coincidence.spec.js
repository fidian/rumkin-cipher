"use strict";

const English = require("../../lib/alphabet/english");
const Español = require("../../lib/alphabet/español");
const english = new English();
const español = new Español();
const indexOfCoincidence = require("../../lib/util/index-of-coincidence");
const Message = require("../../lib/util/message");

describe("indexOfCoincidence", () => {
    it("works with an empty string", () => {
        expect(indexOfCoincidence(new Message(""), english)).toEqual(0);
    });
    it("still returns zero with a single character", () => {
        expect(indexOfCoincidence(new Message("a"), english)).toEqual(0);
    });
    it("returns 1 when all letters are the same", () => {
        expect(indexOfCoincidence(new Message("aa"), english)).toEqual(26);
    });
    it("calculates correctly with a slightly harder example", () => {
        expect(indexOfCoincidence(new Message("aaab"), english)).toEqual(13);
    });
    it("improves the score when more letters are used", () => {
        expect(
            indexOfCoincidence(new Message("aaabaaabaaabaaab"), english)
        ).toEqual(15.6);
    });
    it("calculates correctly for a sentence", () => {
        expect(
            indexOfCoincidence(
                new Message("MARYHADALITTLELAMBITSFLEECEASWHITEASSNOW"),
                english
            )
        ).toBeCloseTo(1.63333, 5);
    });
    it("shows a higher value when the language has more letters", () => {
        expect(
            indexOfCoincidence(
                new Message("MARYHADALITTLELAMBITSFLEECEASWHITEASSNOW"),
                español
            )
        ).toBeCloseTo(1.69615, 5);
    });
});
