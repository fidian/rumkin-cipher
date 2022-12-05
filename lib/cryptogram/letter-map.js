"use strict";

module.exports = class LetterMap {
    /**
     * Creates a new letter map
     */
    constructor() {
        this.map = new Map();
        this.used = []; // Plaintext letters that are used
    }

    /**
     * Copy this letter map
     *
     * @return {LetterMap}
     */
    clone() {
        const copy = new LetterMap();

        for (const [k, v] of this.map) {
            copy.set(k, v);
        }

        return copy;
    }

    /**
     * Sets a letter in the map
     *
     * @param {string} from
     * @param {string} to
     */
    set(from, to) {
        this.map.set(from, to);
        this.used.push(to);
    }

    /**
     * Returns the internal state of the object for testing.
     *
     * @return {Object}
     */
    state() {
        return {
            used: this.used
        };
    }
};
