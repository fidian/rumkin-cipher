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
     * Clones the object
     *
     * @return {NonWord}
     */
    clone() {
        return new NonWord(this.chars);
    }

    /**
     * @return {false}
     */
    isWord() {
        return false;
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
