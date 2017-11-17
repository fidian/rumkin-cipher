"use strict";

var Character;

Character = require("./character");

module.exports = class MessageCharacters {
    /**
     * Creates a new Message, composed of Characters.
     *
     * @param {string} str
     */
    constructor(str) {
        var i;

        this.value = [];

        for (i = 0; i < str.length; i += 1) {
            this.value.push(new Character(str[i], i));
        }
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
        var anotherChar, c, chars, cValue, i, to;

        if (!map) {
            return this;
        }

        chars = [];

        for (i = 0; i < this.values.length; i += 1) {
            c = this.values[i];
            cValue = c.get();

            if (map.hasOwnProperty(cValue)) {
                to = map[cValue];

                // If "to" is not truthy, delete the character.
                if (to) {
                    // Split multiple chars.
                    while (to.length > 1) {
                        anotherChar = c.clone();
                        anotherChar.set(to.charAt(0), i);
                        chars.push(anotherChar);
                        to = to.substr(1);
                    }

                    // Just one character.
                    c.set(to, i);
                    chars.push(c);
                }
            } else {
                // Copy unmapped things.
                chars.push(c);
            }
        }

        this.value = chars;

        return this;
    }


    /**
     * Replaces one character with another, everywhere.
     *
     * @param {string} from
     * @param {string} to
     * @return {this}
     */
    swap(from, to) {
        var i;

        for (i = 0; i < this.value.length; i += 1) {
            if (this.value[i].get() === from) {
                this.value[i].set(to);
            }
        }

        return this;
    }


    /**
     * Convert the value back to a string.
     *
     * @return {string}
     */
    toString() {
        var i, result;

        result = "";

        for (i = 0; i < this.value.length; i += 1) {
            result += this.value[i].get();
        }

        return result;
    }
};
