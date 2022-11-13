"use strict";

module.exports = class Pattern {
    /**
     * Pass uppercase only for best results.
     *
     * @param {string} word
     * @return {string}
     */
    patternFromWord(word) {
        const map = new Map();
        let nextCharCode = 65;

        return word
            .split("")
            .map((letter) => {
                const r = map.get(letter);

                if (r) {
                    return r;
                }

                const c = String.fromCharCode(nextCharCode);
                nextCharCode += 1;
                map.set(letter, c);

                return c;
            })
            .join("");
    }
};
