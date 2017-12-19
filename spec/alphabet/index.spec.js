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
            it("converts the third lowercase letter to the right index", () => {
                expect(instance.toIndex(instance.letterOrder.lower.charAt(2))).toBe(2);
            });
            it("converts the third index to an uppercase letter", () => {
                expect(instance.toLetter(2)).toBe(instance.letterOrder.upper.charAt(2));
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
