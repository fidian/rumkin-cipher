"use strict";

module.exports = class MessageChunk {
    /**
     * Creates a new MessageChunk, which is an extraction of a Message.
     *
     * @param {string} value
     * @param {Array.<number>} positions
     */
    constructor(value, positions) {
        this.setValue(value);
        this.setPositions(positions);
    }


    /**
     * Appends two chunks together, returning a new MessageChunk object.
     *
     * @param {MessageChunk} other
     * @return {MessageChunk}
     */
    append(other) {
        return new MessageChunk(this.getValue() + other.getValue(), this.getPositions().concat(other.getPositions()));
    }


    /**
     * Gets the positions for the chunk.
     *
     * @return {Array.<number>}
     */
    getPositions() {
        return [].concat(this.positions);
    }


    /**
     * Gets the characters in the chunk.
     *
     * @return {string}
     */
    getValue() {
        return this.value;
    }


    /**
     * Sets the positions for the chunk.
     *
     * @param {Array.<number>} positions
     * @return {this}
     */
    setPositions(positions) {
        this.positions = [].concat(positions);

        return this;
    }


    /**
     * Sets the characters in the chunk.
     *
     * @param {string} value
     * @return {this}
     */
    setValue(value) {
        this.value = value;

        return this;
    }
};
