"use strict";

/**
 * @typedef {Object} messageChunk
 * @property {Array.<number>} positions
 * @property {string} value
 */

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

        for (i = 0; i < this.value.length; i += 1) {
            this.positions[i] = [
                i
            ];
        }

        valueUpdated(this);
    }


    /**
     * Appends one or more characters to the message. All are given the same
     * set of positions.
     *
     * @param {messageChunk} chunk
     * @return {this}
     */
    append(chunk) {
        this.value += chunk.value;

        while (this.positions.length < this.value.length) {
            this.positions.push([].concat(chunk.positions));
        }

        valueUpdated(this);

        return this;
    }


    /**
     * Returns the character and associated positions for a given index.
     *
     * @param {number} index
     * @return {messageChunk}
     */
    charAt(index) {
        return {
            positions: [].concat(this.positions[index]),
            value: this.value.charAt(index)
        };
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
     * @return {Message}
     */
    map(map) {
        var chunk, i, result;

        result = new Message();

        for (i = 0; i < this.value.length; i += 1) {
            chunk = this.charAt(i);

            if (map.hasOwnProperty(chunk.value)) {
                chunk.value = map[chunk.value];
            }

            if (chunk.value) {
                result.append(chunk);
            }
        }

        return result;
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
     * @return {Message}
     */
    recode(codeTree) {
        var chunk, codeResult, i, len, result;

        i = 0;
        result = new Message();

        while (i < this.value.length) {
            len = 1;
            chunk = {
                positions: [].concat(this.positions[i])
            };
            codeResult = codeTree.get(this.value.substr(i, len));

            while (codeResult && !codeResult.value && i + len < this.value.length) {
                chunk.positions = chunk.positions.concat(this.positions[i + len]);
                len += 1;
                codeResult = codeTree.get(this.value.substr(i, len));
            }

            if (codeResult && codeResult.value) {
                chunk.value = codeResult.value;
                result.append(chunk);
                i += len;
            } else {
                result.append(this.charAt(i));
                i += 1;
            }
        }

        return result;
    }


    /**
     * Returns a substring and associated positions for that substring.
     * The positions are merged together into a single array.
     *
     * @param {number} start
     * @param {number} len
     * @return {messageChunk}
     */
    substr(start, len) {
        var end, i, positions;

        positions = [];
        end = start + len;

        if (end > this.value.length) {
            end = this.value.length;
        }

        for (i = start; i < end; i += 1) {
            positions = positions.concat(this.positions[i]);
        }

        return {
            positions,
            value: this.value.substr(start, len)
        };
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
