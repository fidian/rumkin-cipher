"use strict";

var morseDecode;

morseDecode = require("../../lib/code-tree/morse-decode")();

describe("morseDecode", () => {
    it("converts the letter B", () => {
        expect(morseDecode.get("-...")).toEqual({
            // new section is -...-
            hasChild: true,
            // Does not get the lowercase B. Prefers the uppercase.
            value: "B"
        });
    });
    it("gets zero", () => {
        expect(morseDecode.get("-----")).toEqual({
            value: "0"
        });
    });
    it("says there is a child when trying to find the SOS procode", () => {
        expect(morseDecode.get("...---..")).toEqual({
            hasChild: true
        });
    });
});
