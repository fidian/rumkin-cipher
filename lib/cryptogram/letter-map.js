"use strict";

module.exports = class LetterMap {
    /**
     * Creates a new letter map
     */
    constructor() {
        this.map = new Map();
        this.used = new Set(); // Plaintext letters that are used
    }

    /**
     * Copy this letter map
     *
     * @return {LetterMap}
     */
    clone() {
        const copy = new LetterMap();
        copy.map = new Map(this.map);
        copy.used = new Set(this.used);

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
        this.used.add(to);
    }

    /**
     * Returns the internal state of the object for testing.
     *
     * @return {Object}
     */
    state() {
        const map = {};

        for (const [k, v] of this.map) {
            map[k] = v;
        }

        return {
            map,
            used: [...this.used].sort()
        };
    }
};
