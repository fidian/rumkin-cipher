"use strict";

const alphabet = require("../alphabet");
const indexOfCoincidence = require("./index-of-coincidence");
const Message = require("../util/message");
const test = require("ava");

const scenarios = [
    {
        description: "empty string",
        alphabet: new alphabet.English(),
        message: new Message(""),
        expected: 0
    },
    {
        description: "single character",
        alphabet: new alphabet.English(),
        message: new Message("a"),
        expected: 0
    },
    {
        description: "all letters are the same",
        alphabet: new alphabet.English(),
        message: new Message("aa"),
        expected: 26
    },
    {
        description: "easy example",
        alphabet: new alphabet.English(),
        message: new Message("aaab"),
        expected: 13
    },
    {
        description: "improved score",
        alphabet: new alphabet.English(),
        message: new Message("aaabaaabaaabaaab"),
        expected: 15.6
    },
    {
        description: "sentence",
        alphabet: new alphabet.English(),
        message: new Message("MARYHADALITTLELAMBITSFLEECEASWHITEASSNOW"),
        expected: "1.63333",
        near: true
    },
    {
        description: "shows a higher value when a language has more letters",
        alphabet: new alphabet.Español(),
        message: new Message("MARYHADALITTLELAMBITSFLEECEASWHITEASSNOW"),
        expected: "1.69615",
        near: true
    }
];

for (const scenario of scenarios) {
    test(`indexOfCoincidence ${scenario.description}`, (t) => {
        const actual = indexOfCoincidence(scenario.message, scenario.alphabet);

        if (scenario.near) {
            t.is(actual.toFixed(5), scenario.expected);
        } else {
            t.is(actual, scenario.expected);
        }
    });
}
