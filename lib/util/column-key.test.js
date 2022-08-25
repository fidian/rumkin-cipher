"use strict";

const alphabet = require("../alphabet/");
const columnKey = require("./column-key");
const test = require("ava");

const scenarios = [
    { description: "empty input", input: "", expected: [] },
    { description: "two numbers", input: "2 1", expected: [1, 0] },
    { description: "word", input: "cat", expected: [1, 0, 2] },
    {
        description: "duplicates forwards",
        input: "hello",
        expected: [1, 0, 2, 3, 4]
    },
    {
        description: "duplicates backwards",
        input: "hello",
        options: { dupesBackwards: true },
        expected: [1, 0, 3, 2, 4]
    },
    {
        description: "mixed words and numbers",
        input: "4zephyr-40",
        options: {},
        expected: [1, 7, 2, 4, 3, 6, 5, 0]
    },
    {
        description: "mixed words and numbers backwards",
        input: "4zephyr-40",
        options: { dupesBackwards: true },
        expected: [2, 7, 1, 4, 3, 6, 5, 0]
    },
    {
        description: "mixed words and numbers column order",
        input: "4zephyr-40",
        options: { columnOrder: true },
        expected: [7, 0, 2, 4, 3, 6, 5, 1]
    },
    {
        description: "mixed words and numbers column order and backwards",
        input: "4zephyr-40",
        options: { columnOrder: true, dupesBackwards: true },
        expected: [7, 2, 0, 4, 3, 6, 5, 1]
    }
];

for (const scenario of scenarios) {
    test(`columnKey ${scenario.description}`, (t) => {
        const english = new alphabet.English();
        t.deepEqual(
            columnKey(english, scenario.input, scenario.options),
            scenario.expected
        );
    });
}
