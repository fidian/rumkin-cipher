"use strict";

const alphabets = require("./");
const test = require("ava");

for (const [name, constructor] of Object.entries(alphabets)) {
    test(name, (t) => {
        const isConstructor = typeof constructor === "function";

        t.truthy(isConstructor, "Exports the constructor");

        if (!isConstructor) {
            return;
        }

        const instance = new constructor();

        t.not(instance.name, "Alphabet");
        t.true(instance.length > 0);
        t.is(instance.letterOrder.lower.length, instance.letterOrder.upper.length);
        t.is(instance.toIndex(instance.letterOrder.lower.charAt(2)), 2);
        t.is(instance.toLetter(2), instance.letterOrder.upper.charAt(2));

        for (const translateFrom of Object.keys(instance.translations || {})) {
            // Maps translated letters to one or more base letters
            const translated = instance.translateString(translateFrom);
            const indexes = instance.findLetterIndexes(translated);
            t.not(Math.min(...indexes), -1);
        }
    });
}
