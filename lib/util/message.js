"use strict";

var MessageChunk;

MessageChunk = require("./message-chunk");

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
     * @param {MessageChunk} chunk
     * @return {this}
     */
    append(chunk) {
        this.value += chunk.getValue();

        while (this.positions.length < this.value.length) {
            this.positions.push(chunk.getPositions());
        }

        valueUpdated(this);

        return this;
    }


    /**
     * Returns the character and associated positions for a given index.
     *
     * @param {number} index
     * @return {MessageChunk}
     */
    charAt(index) {
        return new MessageChunk(this.value.charAt(index), this.positions[index]);
    }


    /**
     * Filters the value to only contain letters that match a pattern.
     *
     * @param {RegExp} pattern
     * @return {Message}
     */
    filter(pattern) {
        var chunk, i, result;

        result = new Message();

        for (i = 0; i < this.value.length; i += 1) {
            chunk = this.charAt(i);

            if (chunk.getValue().match(pattern)) {
                result.append(chunk);
            }
        }

        return result;
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
        var chunk, chunkValue, i, result;

        result = new Message();

        for (i = 0; i < this.length; i += 1) {
            chunk = this.charAt(i);
            chunkValue = chunk.getValue();

            if (map.hasOwnProperty(chunkValue)) {
                chunkValue = map[chunkValue];

                if (chunkValue) {
                    chunk.setValue(chunkValue);
                    result.append(chunk);
                }
            } else {
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
        var chunk, codeResult, i, len, positions, result;

        i = 0;
        result = new Message();

        while (i < this.value.length) {
            len = 1;
            positions = [].concat(this.positions[i]);
            codeResult = codeTree.get(this.value.substr(i, len));

            while (codeResult && !codeResult.value && i + len < this.value.length) {
                positions = positions.concat(this.positions[i + len]);
                len += 1;
                codeResult = codeTree.get(this.value.substr(i, len));
            }

            if (codeResult && codeResult.value) {
                chunk = new MessageChunk(codeResult.value, positions);
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
     * @return {MessageChunk}
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

        return new MessageChunk(this.value.substr(start, len), positions);
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
