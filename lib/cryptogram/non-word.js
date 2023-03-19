"use strict";

module.exports = class NonWord {
    /**
     * Segment of non-word characters
     *
     * @param {string} chars
     */
    constructor(chars) {
        this.chars = chars;
    }

    /**
     * Return a copy of the instance
     *
     * @return {NonWord}
     */
    clone() {
        return new NonWord(this.chars);
    }

    /**
     * Changes the internal state to a string for easy testing.
     *
     * @return {string}
     */
    state() {
        return this.chars;
    }
};
