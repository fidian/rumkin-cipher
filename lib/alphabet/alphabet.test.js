"use strict";

const alphabets = require("./");
const test = require("ava");

test("clone copies Deutsche", (t) => {
    const deutsche = new alphabets.Deutsche();
    const clone = deutsche.clone();

    for (const key of [
        "length",
        "letterOrder",
        "letterOrderIndex",
        "name",
        "padChar",
        "translations"
    ]) {
        t.deepEqual(clone[key], deutsche[key]);
    }
});

test("collapse removes a letter", (t) => {
    const english = new alphabets.English();
    const collapsed = english.collapse("J", "I");

    t.is(collapsed.length, english.length - 1);
    t.is(collapsed.translateString("jJ"), "iI");
});

test("filterKeyIndexes uses first index", (t) => {
    const english = new alphabets.English();
    t.deepEqual(
        english.filterKeyIndexes([2, 3, -1, 4, 3, 5], "first"),
        [2, 3, 4, 5]
    );
});

test("filterKeyIndexes uses last index", (t) => {
    const english = new alphabets.English();
    t.deepEqual(
        english.filterKeyIndexes([2, 3, -1, 4, 3, 5], "last"),
        [2, 4, 3, 5]
    );
});

test("findLetterIndexes returns indexes for letters", (t) => {
    const english = new alphabets.English();
    t.deepEqual(english.findLetterIndexes("Batz!"), [1, 0, 19, 25, -1]);
});

test("isLetter", (t) => {
    const deutsche = new alphabets.Deutsche();

    t.true(deutsche.isLetter("x"));
    t.true(deutsche.isLetter("X"));
    t.true(
        deutsche.isLetter("ß"),
        "Works on letters that should be translated"
    );
    t.false(deutsche.isLetter("1"));
    t.false(deutsche.isLetter("?"));
    t.false(deutsche.isLetter(" "));
});

test("keyAlphabetByIndexes returns a short alphabet", (t) => {
    const english = new alphabets.English();
    const rekeyed = english.keyAlphabetByIndexes([2]);
    t.not(english, rekeyed, "Must be a different copy");
    t.is(rekeyed.letterOrder.lower, "c");
});

test("keyAlphabetByIndexes returns duplicate letters", (t) => {
    const english = new alphabets.English();
    const rekeyed = english.keyAlphabetByIndexes([19, 14, 19]);
    t.not(english, rekeyed, "Must be a different copy");
    t.is(rekeyed.letterOrder.lower, "tot");
});

test("keyAlphabetByIndexes reverses an alphabet", (t) => {
    const english = new alphabets.English();
    const rekeyed = english.keyAlphabetByIndexes([
        25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7,
        6, 5, 4, 3, 2, 1, 0
    ]);
    t.not(english, rekeyed, "Must be a different copy");
    t.is(rekeyed.letterOrder.upper, "ZYXWVUTSRQPONMLKJIHGFEDCBA");
});

test("keyWord works with empty string", (t) => {
    const english = new alphabets.English();
    const rekeyed = english.keyWord("");
    t.not(english, rekeyed, "Must be a different copy");
    t.is(rekeyed.letterOrder.lower, "abcdefghijklmnopqrstuvwxyz");
});

test("keyWord works with a word, duplicates using first instance", (t) => {
    const english = new alphabets.English();
    const rekeyed = english.keyWord("hellololly");
    t.not(english, rekeyed, "Must be a different copy");
    t.is(rekeyed.letterOrder.lower, "heloyabcdfgijkmnpqrstuvwxz");
});

test("keyWord works with a word, duplicates using last instance", (t) => {
    const english = new alphabets.English();
    const rekeyed = english.keyWord("hellololly", {
        useLastInstance: true
    });
    t.not(english, rekeyed, "Must be a different copy");
    t.is(rekeyed.letterOrder.lower, "heolyabcdfgijkmnpqrstuvwxz");
});

test("keyWord puts a keyword at the end", (t) => {
    const english = new alphabets.English();
    const rekeyed = english.keyWord("bring", {
        keyAtEnd: true
    });
    t.not(english, rekeyed, "Must be a different copy");
    t.is(rekeyed.letterOrder.lower, "acdefhjklmopqstuvwxyzbring");
});

test("keyWord reverses, uses last instance, keyword at the end", (t) => {
    const english = new alphabets.English();
    const rekeyed = english.keyWord("bringmore", {
        keyAtEnd: true,
        reverseAlphabet: true,
        useLastInstance: true
    });
    t.not(english, rekeyed, "Must be a different copy");
    t.is(rekeyed.letterOrder.lower, "zyxwvutsqplkjhfdcabingmore");
});

test("matchCase", (t) => {
    const deutsche = new alphabets.Deutsche();
    t.is(deutsche.matchCase("X", "y"), "Y", "Capitalizes");
    t.is(deutsche.matchCase("x", "Y"), "y", "Lowercases");
    t.is(deutsche.matchCase("X", "1"), "1", "Skips non-letters");
    t.is(deutsche.matchCase("ß", "X"), "x", "Translated character");
});
