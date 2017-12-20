"use strict";

var Message;

Message = require("./message");

/**
 * Perform maintenance on the object when the value is changed.
 *
 * @param {MessageCharacters} obj
 */
function valueUpdated(obj) {
    obj.length = obj.value.length;
}

module.exports = class MessageString extends Message {
    /**
     * Creates a new Message, composed of Characters.
     *
     * @param {string} str
     */
    constructor(str) {
        super();
        this.value = (str || "").toString();
        valueUpdated(this);
    }


    /**
     * Translates characters per a map-style object.
     *
     * If the message is "ABC" and the map is {b:"2", "C": "^"} then the
     * result is "AB^". It is possible for this to generate multiple
     * characters out of one and to delete characters. The mapping could
     * include cycles, so {A:"B", B:"A", C:""} would change "ABCD" into "BAD".
     *
     * @param {Object} map
     * @return {this}
     */
    map(map) {
        var c, i, result;

        result = "";

        for (i = 0; i < this.value.length; i += 1) {
            c = this.value.charAt(i);

            if (map.hasOwnProperty(c)) {
                c = map[c];
            }

            result += c;
        }

        this.value = result;
        valueUpdated(this);

        return this;
    }


    /**
     * Replaces one character with another, everywhere. Doesn't swap the
     * reverse, so ("a", "b") applied to "abc" results in "bbc".
     *
     * @param {string} from
     * @param {string} to
     * @return {this}
     */
    swap(from, to) {
        this.value = this.value.replace(new RegExp(`\\${from}`, "g"), to);
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
