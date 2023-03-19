"use strict";

const Parser = require("./parser");
const sampleWordlist2 = require("./sample-wordlist-2");
const Solver = require("./solver");
const test = require("ava");

const parser = new Parser();

/**
 * Convert the parsed words into an easier format for tests
 *
 * @param {Array.<Word|Nonword>} items
 * @return {Array.<Object|string>}
 */
function whatWeCareAbout(items) {
    return items.map((item) => {
        const state = item.state();

        if (typeof state === "string") {
            return state;
        }

        return {
            chars: state.word.chars,
            deciphersCount: state.availableDeciphers.length
        };
    });
}

test("Solver.eliminateBadCombinations", (t) => {
    const parsed = parser.parseWords("garter barter", sampleWordlist2);
    t.deepEqual(whatWeCareAbout(parsed), [
        { chars: "garter", deciphersCount: 155 },
        " ",
        { chars: "barter", deciphersCount: 155 }
    ]);

    const solver = new Solver();

    return solver.eliminateBadCombinations(parsed).then((result) => {
        t.deepEqual(whatWeCareAbout(result), [
            { chars: "garter", deciphersCount: 52 },
            " ",
            { chars: "barter", deciphersCount: 52 }
        ]);
    });
});

test("Solver.eliminateBadCombinations - homophonic", (t) => {
    const parsed = parser.parseWords("garter barter", sampleWordlist2);
    t.deepEqual(whatWeCareAbout(parsed), [
        { chars: "garter", deciphersCount: 155 },
        " ",
        { chars: "barter", deciphersCount: 155 }
    ]);

    const solver = new Solver();

    return solver.eliminateBadCombinations(parsed, { homophonic: true }).then((result) => {
        t.deepEqual(whatWeCareAbout(result), [
            { chars: "garter", deciphersCount: 155 },
            " ",
            { chars: "barter", deciphersCount: 155 }
        ]);
    });
});
