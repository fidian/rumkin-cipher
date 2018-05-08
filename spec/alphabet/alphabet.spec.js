"use strict";

var alphabets;

alphabets = require("../../lib/alphabet/");

describe("Alphabet Class", () => {
    describe("clone", () => {
        it("copies Deutsche", () => {
            var clone, deutsche;

            deutsche = new alphabets.Deutsche();
            clone = deutsche.clone();

            [
                "length",
                "letterOrder",
                "letterOrderIndex",
                "name",
                "padChar",
                "translations"
            ].forEach((key) => {
                expect(clone[key]).toBeDefined();
                expect(clone[key]).toEqual(deutsche[key]);
            });
        });
    });
    describe("filterKeyIndexes", () => {
        it("uses first index", () => {
            var english;

            english = new alphabets.English();
            expect(english.filterKeyIndexes([
                2,
                3,
                -1,
                4,
                3,
                5
            ], "first")).toEqual([
                2,
                3,
                4,
                5
            ]);
        });
        it("uses last index", () => {
            var english;

            english = new alphabets.English();
            expect(english.filterKeyIndexes([
                2,
                3,
                -1,
                4,
                3,
                5
            ], "last")).toEqual([
                2,
                4,
                3,
                5
            ]);
        });
    });
    describe("findLetterIndexes", () => {
        it("returns indexes for letters", () => {
            var english;

            english = new alphabets.English();
            expect(english.findLetterIndexes("Batz!")).toEqual([
                1,
                0,
                19,
                25,
                -1
            ]);
        });
    });
    describe("isLetter", () => {
        var deutsche;

        beforeEach(() => {
            deutsche = new alphabets.Deutsche();
        });
        it("works on lowercase", () => {
            expect(deutsche.isLetter("x")).toBe(true);
        });
        it("works on uppercase", () => {
            expect(deutsche.isLetter("X")).toBe(true);
        });
        it("works on letters that should be translated", () => {
            expect(deutsche.isLetter("ß")).toBe(true);
        });
        it("fails on numbers", () => {
            expect(deutsche.isLetter("1")).toBe(false);
        });
        it("fails on symbols", () => {
            expect(deutsche.isLetter("?")).toBe(false);
        });
        it("fails on spaces", () => {
            expect(deutsche.isLetter(" ")).toBe(false);
        });
    });
    describe("keyAlphabetByIndexes", () => {
        it("returns a copy", () => {
            var english, rekeyed;

            english = new alphabets.English();
            rekeyed = english.keyAlphabetByIndexes([]);
            expect(english).not.toBe(rekeyed);
        });
        it("returns a short alphabet when supplied a short list of indexes", () => {
            var english, rekeyed;

            english = new alphabets.English();
            rekeyed = english.keyAlphabetByIndexes([
                2
            ]);
            expect(rekeyed.letterOrder.lower).toEqual("c");
        });
        it("duplicates letters when there are duplicate indexes", () => {
            var english, rekeyed;

            english = new alphabets.English();
            rekeyed = english.keyAlphabetByIndexes([
                19,
                14,
                19
            ]);
            expect(rekeyed.letterOrder.lower).toEqual("tot");
        });
        it("reverses an alphabet", () => {
            var english, rekeyed;

            english = new alphabets.English();
            rekeyed = english.keyAlphabetByIndexes([
                25,
                24,
                23,
                22,
                21,
                20,
                19,
                18,
                17,
                16,
                15,
                14,
                13,
                12,
                11,
                10,
                9,
                8,
                7,
                6,
                5,
                4,
                3,
                2,
                1,
                0
            ]);
            expect(rekeyed.letterOrder.upper).toEqual("ZYXWVUTSRQPONMLKJIHGFEDCBA");
        });
    });
    describe("keyWord", () => {
        it("returns a copy", () => {
            var english, rekeyed;

            english = new alphabets.English();
            rekeyed = english.keyWord("");
            expect(rekeyed).not.toBe(english);
        });
        it("works with empty string", () => {
            var english, rekeyed;

            english = new alphabets.English();
            rekeyed = english.keyWord("");
            expect(rekeyed.letterOrder.lower).toEqual("abcdefghijklmnopqrstuvwxyz");
        });
        it("works with a word, duplicates using first instance", () => {
            var english, rekeyed;

            english = new alphabets.English();
            rekeyed = english.keyWord("hellololly");
            expect(rekeyed.letterOrder.lower).toEqual("heloyabcdfgijkmnpqrstuvwxz");
        });
        it("works with a word, duplicates using last instance", () => {
            var english, rekeyed;

            english = new alphabets.English();
            rekeyed = english.keyWord("hellololly", {
                useLastInstance: true
            });
            expect(rekeyed.letterOrder.lower).toEqual("heolyabcdfgijkmnpqrstuvwxz");
        });
        it("puts a keyword at the end", () => {
            var english, rekeyed;

            english = new alphabets.English();
            rekeyed = english.keyWord("bring", {
                keyAtEnd: true
            });
            expect(rekeyed.letterOrder.lower).toEqual("acdefhjklmopqstuvwxyzbring");
        });
        it("reverses, uses last instance, keyword at the end", () => {
            var english, rekeyed;

            english = new alphabets.English();
            rekeyed = english.keyWord("bringmore", {
                keyAtEnd: true,
                reverseAlphabet: true,
                useLastInstance: true
            });
            expect(rekeyed.letterOrder.lower).toEqual("zyxwvutsqplkjhfdcabingmore");
        });
    });
    describe("matchCase", () => {
        [
            {
                description: "capitalizes",
                expected: "Y",
                referenceLetter: "X",
                value: "y"
            },
            {
                description: "lowercases",
                expected: "y",
                referenceLetter: "x",
                value: "Y"
            },
            {
                description: "skips non-letters",
                expected: "1",
                referenceLetter: "X",
                value: "1"
            },
            {
                // Very special case where a letter is a translated character.
                // We allow to use the translated character as a reference for
                // capitalization, but we don't encipher/decipher translated
                // letters.
                // abcd...xyzßäëöü = lowercase
                // abcd...xyz = lowercase "letters"
                description: "translated character",
                expected: "x",
                referenceLetter: "ß",
                value: "X"
            }
        ].forEach((scenario) => {
            it(scenario.description, () => {
                var deutsche;

                deutsche = new alphabets.Deutsche();
                expect(deutsche.matchCase(scenario.referenceLetter, scenario.value)).toEqual(scenario.expected);
            });
        });
    });
});
