"use strict";

var MessageChunk;

MessageChunk = require("./message-chunk");

/**
 * @typedef {Object} RecodeOptions
 * @property {string} {addAfterCode=""}
 * @property {string} {addBeforeCode=""}
 * @property {string} {skipAfterCode=""}
 */

/**
 * @typedef {Object} RecodeBestCode
 * @property {CodeResult} codeResult
 * @property {number} len
 * @property {Array<Array<number>>} positions
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
        this.value = (str || "").toString();
        this.positions = [];

        for (let i = 0; i < this.value.length; i += 1) {
            this.positions[i] = [i];
        }

        valueUpdated(this);
    }

    /**
     * Appends one or more characters to the message. All are given the same
     * set of positions.
     *
     * @param {Message|MessageChunk} chunk
     * @return {this}
     */
    append(chunk) {
        if (chunk instanceof Message) {
            for (let i = 0; i < chunk.length; i += 1) {
                this.append(chunk.charAt(i));
            }
        } else {
            this.value += chunk.getValue();

            while (this.positions.length < this.value.length) {
                this.positions.push(chunk.getPositions());
            }

            valueUpdated(this);
        }

        return this;
    }

    /**
     * Returns the character and associated positions for a given index.
     *
     * @param {number} index
     * @return {MessageChunk}
     */
    charAt(index) {
        return new MessageChunk(
            this.value.charAt(index),
            this.positions[index]
        );
    }

    /**
     * Filters the value to only contain letters that match a pattern.
     *
     * @param {RegExp|Function} filterValue
     * @return {Message}
     */
    filter(filterValue) {
        const result = new Message();

        for (let i = 0; i < this.value.length; i += 1) {
            const chunk = this.charAt(i);

            if (typeof filterValue === "function") {
                if (filterValue(chunk, i)) {
                    result.append(chunk);
                }
            } else {
                if (chunk.getValue().match(filterValue)) {
                    result.append(chunk);
                }
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
        const result = new Message();

        for (let i = 0; i < this.length; i += 1) {
            const chunk = this.charAt(i);
            const chunkValue = chunk.getValue();

            if (Object.hasOwn(map, chunkValue)) {
                const mappedValue = map[chunkValue];

                if (mappedValue) {
                    chunk.setValue(mappedValue);
                    result.append(chunk);
                }
            } else {
                result.append(chunk);
            }
        }

        return result;
    }

    /**
     * Overlays a new message on top of an existing message, replacing
     * characters that are alphabetic characters. It also preserves
     * capitalization.
     *
     * this: Gruß dich!
     * overlay: ZYXWVUTS
     * output: Zyxw vuts!
     *
     * If there are extra letters, they are appended to the end.
     *
     * this: z.
     * overlay: ab
     * output: a.b
     *
     * @param {Alphabet} alphabet
     * @param {Message} overlay
     * @return {Message}
     */
    overlay(alphabet, overlay) {
        const result = new Message();
        let overlayIndex = 0;

        for (let i = 0; i < this.value.length; i += 1) {
            const c = this.value.charAt(i);

            if (!alphabet.isLetter(c)) {
                // Use current message to get a non-letter.
                result.append(this.charAt(i));
            } else if (overlayIndex < overlay.length) {
                // Use overlay
                const chunk = overlay.charAt(overlayIndex);
                overlayIndex += 1;

                // Change case to match
                chunk.setValue(alphabet.matchCase(c, chunk.getValue()));
                result.append(chunk);
            }
        }

        while (overlayIndex < overlay.length) {
            result.append(overlay.charAt(overlayIndex));
            overlayIndex += 1;
        }

        return result;
    }

    /**
     * Processes a message. Passes chunks of the message through the filter
     * function as an array of individual characters.
     *
     * This must be used with a function that will modify or replace
     * charactes with alternate characters. The number of characters going
     * into the callback must be the same as the number coming back out of
     * the callback.
     *
     * @param {Object} [options]
     * @param {Function} callback
     * @return {Message} New message after processing.
     */
    process(options, callback) {
        const result = new Message();
        let characters = [];

        /**
         * Passes the character array (MessageChunk objects) to the function.
         * The result should be returned as another array of characters.
         */
        function passToCallback() {
            var i, modifiedCharacters;

            modifiedCharacters = callback(characters);
            characters = [];

            for (i = 0; i < modifiedCharacters.length; i += 1) {
                result.append(modifiedCharacters[i]);
            }
        }

        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        if (options.size < 1) {
            options.size = 1;
        }

        for (let index = 0; index < this.length; index += 1) {
            characters.push(this.charAt(index));

            if (characters.length >= this.size) {
                passToCallback();
            }
        }

        if (characters.length) {
            passToCallback();
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
     * @param {RecodeOptions} options
     * @return {Message}
     */
    recode(codeTree, options) {
        let i = 0;
        options = options || {};
        const result = new Message();

        while (i < this.value.length) {
            const bestCode = this.recodeFindBestCode(i, codeTree);

            if (bestCode) {
                if (options.addBeforeCode) {
                    result.append(options.addBeforeCode);
                }

                const chunk = new MessageChunk(bestCode.codeResult.value, bestCode.positions);
                result.append(chunk);

                if (options.addAfterCode) {
                    result.append(new MessageChunk(options.addAfterCode, bestCode.positions));
                }

                i += bestCode.len;

                if (options.skipAfterCode && this.value.charAt(i) === options.skipAfterCode) {
                    i += 1;
                }
            } else {
                result.append(this.charAt(i));
                i += 1;
            }
        }

        return result;
    }

    /**
     * Finds the longest code tree item when starting at a specific position.
     *
     * @param {number} startPosition
     * @param {CodeTree} codeTree
     * @return {RecodeBestCode|null}
     */
    recodeFindBestCode(startPosition, codeTree) {
        let len = 0;
        let prevLen = 0;
        let positions = [];
        let prevPositions = [];
        let codeResult = null;
        let prevCodeResult = null;

        do {
            prevLen = len;
            prevPositions = positions;
            prevCodeResult = codeResult;

            len += 1;
            positions = [...prevPositions, this.positions[startPosition + len]];
            codeResult = codeTree.get(this.value.substr(startPosition, len));
        } while (codeResult && startPosition + len < this.value.length);

        if (!codeResult || !codeResult.value) {
            len = prevLen;
            positions = prevPositions;
            codeResult = prevCodeResult;
        }

        if (codeResult && codeResult.value) {
            return {
                codeResult,
                len,
                positions
            };
        }

        return null;
    }

    /**
     * Separate a message into letters and non-letters. Given the following
     * messages, here are the results.
     *
     * input: Gruß dich! 123
     * output: Grußdich
     *
     * The ß is not a letter in German, but it is a translatable character, so
     * this will include it in the result.
     *
     * @param {Alphabet} alphabet
     * @return {Message}
     */
    separate(alphabet) {
        const result = new Message();

        for (let i = 0; i < this.value.length; i += 1) {
            const c = this.value.charAt(i);

            if (alphabet.isLetter(c)) {
                const chunk = this.charAt(i);
                result.append(chunk);
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
        let positions = [];
        let end = start + len;

        if (end > this.value.length) {
            end = this.value.length;
        }

        for (let i = start; i < end; i += 1) {
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

    /**
     * Translates a message by altering accented characters and replacing them
     * with ones from the standard alphabet.
     *
     * @param {Alphabet} alphabet
     * @return {Message}
     */
    translate(alphabet) {
        const result = new Message();

        for (let i = 0; i < this.length; i += 1) {
            const chunk = this.charAt(i);
            chunk.setValue(alphabet.translateString(chunk.getValue()));
            result.append(chunk);
        }

        return result;
    }
};
