"use strict";

var factor;

factor = require("../../lib/util/factor");

describe("factor", () => {
    it("skips negative", () => {
        expect(factor(-1)).toEqual([]);
    });
    it("skips 2", () => {
        expect(factor(2)).toEqual([]);
    });
    it("skips floating point numbers", () => {
        expect(factor(12.23)).toEqual([]);
    });
    it("factors 6", () => {
        expect(factor(6)).toEqual([
            2,
            3
        ]);
    });
    it("factors 8", () => {
        expect(factor(8)).toEqual([
            2,
            2,
            2
        ]);
    });
    it("factors 24", () => {
        expect(factor(24)).toEqual([
            2,
            2,
            2,
            3
        ]);
    });
    it("factors 97", () => {
        expect(factor(97)).toEqual([]);
    });
    it("factors 12345", () => {
        expect(factor(12345)).toEqual([
            3,
            5,
            823
        ]);
    });
});
