"use strict";

const Wordlist = require("./wordlist");

// Patterns used by tests
// A: parser
// ABC: word
// ABB: parser
// ABCCD: parser
module.exports = new Wordlist([
    "ava", // !ABC !ABB
    "bat", // ABC !ABB
    "cat", // ABC !ABB
    "dolphin",
    "eagle", // !ABCCD
    "fork",
    "gastrointestinal",
    "human", // !ABCCD
    "igor",
    "juliet",
    "kite",
    "llama", // !ABCCD
    "moose", // !ABCCD
    "neighbor",
    "owl", // ABC !ABB
    "pine",
    "quit",
    "roo", // !ABC ABB
    "steam", // !ABCCD
    "team",
    "under", // !ABCCD
    "vowel", // !ABCCD
    "wally", // ABCCD
    "xyz", // ABC !ABB
    "yawn",
    "zoo" // !ABC ABB
]);
