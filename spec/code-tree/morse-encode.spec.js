"use strict";

var morseEncode;

morseEncode = require("../../lib/code-tree/morse-encode")();

describe("morseEncode", () => {
    it("works for lowercase", () => {
        expect(morseEncode.get("b")).toEqual({
            value: "-..."
        });
    });
    it("works for uppercase", () => {
        expect(morseEncode.get("B")).toEqual({
            value: "-..."
        });
    });
    it("handles words and says they don't code", () => {
        expect(morseEncode.get("asdf")).toEqual(null);
    });
    it("works with procodes", () => {
        expect(morseEncode.get("[UNDERSTOOD]")).toEqual({
            value: "...-."
        });
    });
});
