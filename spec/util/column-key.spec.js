"use strict";

const alphabets = require("../../lib/alphabet/");
const columnKey = require("../../lib/util/column-key");

describe("columnKey", () => {
    it("returns empty array with no column keys", () => {
        expect(columnKey(new alphabets.English(), "")).toEqual([]);
    });
    it("parses numbers", () => {
        expect(columnKey(new alphabets.English(), "2 1")).toEqual([1, 0]);
    });
    it("parses words", () => {
        expect(columnKey(new alphabets.English(), "cat")).toEqual([1, 0, 2]);
    });
    it("handles duplicates forwards", () => {
        expect(columnKey(new alphabets.English(), "hello")).toEqual([
            1, 0, 2, 3, 4
        ]);
    });
    it("handles duplicates backwards", () => {
        expect(
            columnKey(new alphabets.English(), "hello", {
                dupesBackwards: true
            })
        ).toEqual([1, 0, 3, 2, 4]);
    });
    it("handles mixed words and letters forwards", () => {
        expect(columnKey(new alphabets.English(), "4zephyr-40", {})).toEqual([
            1, 7, 2, 4, 3, 6, 5, 0
        ]);
    });
    it("handles mixed words and letters backwards", () => {
        expect(
            columnKey(new alphabets.English(), "4zephyr-40", {
                dupesBackwards: true
            })
        ).toEqual([2, 7, 1, 4, 3, 6, 5, 0]);
    });
    it("handles mixed words and letters forwards with column order", () => {
        expect(
            columnKey(new alphabets.English(), "4zephyr-40", {
                columnOrder: true
            })
        ).toEqual([7, 0, 2, 4, 3, 6, 5, 1]);
    });
    it("handles mixed words and letters backwards with column order", () => {
        expect(
            columnKey(new alphabets.English(), "4zephyr-40", {
                columnOrder: true,
                dupesBackwards: true
            })
        ).toEqual([7, 2, 0, 4, 3, 6, 5, 1]);
    });
});
