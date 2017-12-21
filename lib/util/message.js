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
     * Recodes a message using a code tree. This can change multiple letters
     * into multiple letters. For example, assume the code tree maps "A"
     * to "aaaaa" and "BBB" to "b". Thus, the message "ABBCBBB" changes into
     * "aaaaaBBCb". It also tries to match the shortest code possible. If
     * a code tree maps "A" to "a" and "AA" to "bb", then "AAA" would be
     * recoded as "aaa" because it only will hit the first code mapping.
     *
     * @param {CodeTree} codeTree
     * @return {this}
     */
    recode(codeTree) {
        var codePositions, codeResult, i, len, newPositions, newValue, valueIndex;

        valueIndex = 0;
        newValue = "";
        newPositions = [];

        while (valueIndex < this.value.length) {
            len = 1;
            codeResult = codeTree.get(this.value.substr(valueIndex, len));
            codePositions = [].concat(this.positions[valueIndex]);

            while (codeResult && !codeResult.value && valueIndex + len < this.value.length) {
                codePositions = codePositions.concat(this.positions[valueIndex + len]);
                len += 1;
                codeResult = codeTree.get(this.value.substr(valueIndex, len));
            }

            if (codeResult && codeResult.value) {
                newValue += codeResult.value;

                for (i = 0; i < codeResult.value.length; i += 1) {
                    newPositions.push(codePositions);
                }

                valueIndex += len;
            } else {
                newValue += this.value.charAt(valueIndex);
                newPositions.push(this.positions[valueIndex]);
                valueIndex += 1;
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
