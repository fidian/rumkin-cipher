"use strict";

module.exports = class Pattern {
    /**
     * Create a new instance
     *
     * @param {string} value
     * @param {number} distinctCount
     */
    constructor(value, distinctCount) {
        this.value = value;
        this.distinctCount = distinctCount;
    }

    /**
     * Return the internal state for easier testing
     *
     * @return {Object}
     */
    state() {
        return {
            distinctCount: this.distinctCount,
            value: this.value
        };
    }

    /**
     * Pass uppercase only for best results.
     *
     * @param {string} word
     * @return {Pattern}
     */
    static patternFromWord(word) {
        const map = new Map();
        let distinctCount = 0;
        const value = word
            .split("")
            .map((letter) => {
                const r = map.get(letter);

                if (r) {
                    return r;
                }

                const c = String.fromCharCode(65 + distinctCount);
                distinctCount += 1;
                map.set(letter, c);

                return c;
            })
            .join("");

        return new Pattern(value, distinctCount);
    }
};
