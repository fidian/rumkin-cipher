"use strict";

const kappaPlaintext = require("./kappa-plaintext");
const test = require("ava");

const scenarios = [
    {
        description: "empty string",
        input: "",
        expected: 0
    },
    {
        description: "single character",
        input: "a",
        expected: 0
    },
    {
        description: "all letters are the same",
        input: "aa",
        expected: 1
    },
    {
        description: "easy example",
        input: "aaab",
        expected: 0.5
    },
    {
        description: "improves when more letters are used",
        input: "aaabaaabaaabaaab",
        expected: 0.6
    },
    {
        description: "sentence",
        input: "MARYHADALITTLELAMBITSFLEECEASWHITEASSNOW",
        expected: "0.06282",
        near: true
    }
];

for (const scenario of scenarios) {
    test(`kappaPlaintext ${scenario.description}`, (t) => {
        const actual = kappaPlaintext(scenario.input);

        if (scenario.near) {
            t.is(actual.toFixed(5), scenario.expected);
        } else {
            t.is(actual, scenario.expected);
        }
    });
}
