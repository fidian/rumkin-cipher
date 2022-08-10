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
            this.positions[i] = [i];
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
        var chunk, i, result;

        result = new Message();

        for (i = 0; i < this.value.length; i += 1) {
            chunk = this.charAt(i);

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
        var c, chunk, i, overlayIndex, result;

        result = new Message();
        overlayIndex = 0;

        for (i = 0; i < this.value.length; i += 1) {
            c = this.value.charAt(i);

            if (!alphabet.isLetter(c)) {
                // Use current message to get a non-letter.
                result.append(this.charAt(i));
            } else if (overlayIndex < overlay.length) {
                // Use overlay
                chunk = overlay.charAt(overlayIndex);
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
        var characters, index, result;

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

        result = new Message();
        characters = [];

        for (index = 0; index < this.length; index += 1) {
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

            while (
                codeResult &&
                !codeResult.value &&
                i + len < this.value.length
            ) {
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
        var c, chunk, i, result;

        result = new Message();

        for (i = 0; i < this.value.length; i += 1) {
            c = this.value.charAt(i);

            if (alphabet.isLetter(c)) {
                chunk = this.charAt(i);
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

    /**
     * Translates a message by altering accented characters and replacing them
     * with ones from the standard alphabet.
     *
     * @param {Alphabet} alphabet
     * @return {Message}
     */
    translate(alphabet) {
        var chunk, i, result;

        result = new Message();

        for (i = 0; i < this.length; i += 1) {
            chunk = this.charAt(i);
            chunk.setValue(alphabet.translateString(chunk.getValue()));
            result.append(chunk);
        }

        return result;
    }
};
