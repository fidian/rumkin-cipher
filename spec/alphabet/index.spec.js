"use strict";

var alphabets;

alphabets = require("../../lib/alphabet/");

describe("Alphabets", () => {
    Object.keys(alphabets).forEach((name) => {
        var Alphabet;

        Alphabet = alphabets[name];
        describe(`${name} constructor`, () => {
            it("exports the constructor", () => {
                expect(Alphabet).toEqual(jasmine.any(Function));
            });
        });
        describe(`${name} instance`, () => {
            var instance;

            instance = new Alphabet();
            it("has a name", () => {
                expect(instance.name).not.toBe("Alphabet");
            });
            it("has a length", () => {
                expect(instance.length).toBeGreaterThan(0);
            });
            it("has a length that matches the lower length", () => {
                expect(instance.length).toEqual(instance.letterOrder.lower.length);
            });
            it("has a length that matches the upper length", () => {
                expect(instance.length).toEqual(instance.letterOrder.upper.length);
            });
            describe("translations", () => {
                Object.keys(instance.translations).forEach((input) => {
                    it(`maps ${input} to base letters`, () => {
                        instance.findLetterIndexes(input).forEach((index) => {
                            expect(index).not.toBe(-1);
                        });
                    });
                });
            });
        });
    });
});
