"use strict";

const helper = require("../helper-test")("skip");

helper.both({
    description: "Not skipping",
    alphabet: "English",
    options: {
        skip: 0
    },
    plainText: "Testing this",
    cipherText: "Testing this"
});

helper.both({
    description: "Bad skip number",
    alphabet: "English",
    options: {
        skip: 7
    },
    plainText: "Testing this too",
    cipherText: "Testing this too"
});

helper.both({
    description: "Good skip number",
    alphabet: "English",
    options: {
        skip: 7
    },
    plainText: "Testing this",
    cipherText: "Thnssti eigt"
});

helper.both({
    description: "size 11 skip 7",
    alphabet: "English",
    options: {
        skip: 7
    },
    plainText: "ABCDEFGHIJK",
    cipherText: "AIFCKHEBJGD"
});

helper.both({
    description: "size 5 skip 2",
    alphabet: "English",
    options: {
        skip: 7
    },
    plainText: "ABCDE",
    cipherText: "ADBEC"
});

helper.both({
    description: "size 15 skip 3",
    alphabet: "English",
    options: {
        skip: 3
    },
    plainText: "ABCDEFGHIJKLMNO",
    cipherText: "AEIMBFJNCGKODHL"
});

helper.both({
    description: "size 15 skip 6",
    alphabet: "English",
    options: {
        skip: 6
    },
    plainText: "ABCDEFGHIJKLMNO",
    cipherText: "AHOGNFMELDKCJBI"
});

helper.both({
    description: "size 8 skip 2 offset 1",
    alphabet: "English",
    options: {
        offset: 1,
        skip: 2
    },
    plainText: "ABCDEFGH",
    cipherText: "BEHCFADG"
});

helper.both({
    description: "size 8 skip 2 offset 2",
    alphabet: "English",
    options: {
        offset: 2,
        skip: 2
    },
    plainText: "ABCDEFGH",
    cipherText: "CFADGBEH"
});

helper.both({
    description: "size 8 skip 2 offset 3",
    alphabet: "English",
    options: {
        offset: 3,
        skip: 2
    },
    plainText: "ABCDEFGH",
    cipherText: "DGBEHCFA"
});

helper.both({
    description: "size 23 skip 5 offset 3",
    alphabet: "English",
    options: {
        offset: 3,
        skip: 5
    },
    plainText: "ABCDEFGHIJKLMNOPQRSTUVW",
    cipherText: "DJPVEKQWFLRAGMSBHNTCIOU"
});

helper.both({
    description: "size 23 skip 15 offset 13",
    alphabet: "English",
    options: {
        offset: 13,
        skip: 15
    },
    plainText: "ABCDEFGHIJKLMNOPQRSTUVW",
    cipherText: "NGWPIBRKDTMFVOHAQJCSLEU"
});
