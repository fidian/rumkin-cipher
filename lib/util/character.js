"use strict";

module.exports = class Character {
    /**
     * Creates a new Message, composed of Characters.
     *
     * @param {string} c
     * @param {number} pos
     */
    constructor(c, pos) {
        this.values = [
            c
        ];
        this.positions = [
            pos
        ];
    }


    /**
     * Copies this character. Useful for mapping ß to "ss".
     *
     * @return {Character} The copy
     */
    clone() {
        var c;

        c = new Character();
        c.values = [].concat(this.values);
        c.positions = [].concat(this.positions);

        return c;
    }


    /**
     * Gets the current value.
     *
     * @return {string}
     */
    get() {
        return this.values[0];
    }


    /**
     * Sets the value and new position.
     *
     * @param {string} c
     * @param {number} pos
     */
    set(c, pos) {
        if (typeof pos !== "number") {
            pos = this.positions[0];
        }

        this.values.unshift(c);
        this.positions.unshift(pos);
    }
};
