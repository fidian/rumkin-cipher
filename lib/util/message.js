"use strict";

/**
 * Perform maintenance on the object when the value is changed.
 *
 * @param {MessageCharacters} obj
 */
function valueUpdated(obj) {
    obj.length = obj.value.length;
}

module.exports = class Message {
    /**
     * Creates a new Message.
     *
     * @param {string} str
     */
    constructor(str) {
        var i;

        this.value = (str || "").toString();
        this.positions = [];

        for (i = 0; i < str.length; i += 1) {
            this.positions[i] = [
                i
            ];
        }

        valueUpdated(this);
    }


    /**
     * Translates characters per a map-style object.
     *
     * If the message is "ABC" and the map is {b:"2", "C": "^"} then the
     * result is "AB^". It is possible for this to generate multiple
     * characters out of one and to delete characters. The mapping could
     * include cycles, so {A:"B", B:"xxx", C:""} would change "ABCD" into
     * "BxxxD".
     *
     * @param {Object} map
     * @return {this}
     */
    map(map) {
        var c, i, newPositions, newValue, valueIndex;

        if (!map) {
            return this;
        }

        newValue = "";
        newPositions = [];

        for (valueIndex = 0; valueIndex < this.value.length; valueIndex += 1) {
            c = this.value.charAt(valueIndex);

            if (map.hasOwnProperty(c)) {
                c = map[c];
            }

            newValue += c;

            for (i = 0; i < c.length; i += 1) {
                newPositions.push(this.positions[valueIndex]);
            }
        }

        this.value = newValue;
        this.positions = newPositions;
        valueUpdated(this);

        return this;
    }


    /**
     * Convert the value back to a string.
     *
     * @return {string}
     */
    toString() {
        return this.value;
    }
};
