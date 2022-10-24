"use strict";

/**
 * Each of the pad strings currently support up to 1 character, not more.
 * Handling more would require major updates to recode() and recodeHandlePad().
 *
 * @typedef {Object} RecodeOptions
 * @property {string} {padAddCodedToCoded=""}
 * @property {string} {padAddCodedToUncoded=""}
 * @property {string} {padAddUncodedToCoded=""}
 * @property {string} {padAddUncodedToUncoded=""}
 * @property {string} {padRemoveCodedToCoded=""}
 * @property {string} {padRemoveCodedToUncoded=""}
 * @property {string} {padRemoveUncodedToCoded=""}
 * @property {string} {padRemoveUncodedToUncoded=""}
 */

const CODED = "CODED";
const UNCODED = "UNCODED";

const MessageChunk = require("./message-chunk");

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
     * Appends one or more characters to the message. Messages appended will
     * preserve their positions properly, where as MessageChunk instances will
     * have their positions copied for each letter in the chunk.
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
            const modifiedCharacters = callback(characters);
            characters = [];

            for (let i = 0; i < modifiedCharacters.length; i += 1) {
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
     * Recodes a message using a code tree. This can change one or multiple
     * letters into a different letter or sequence of letters. For example, a
     * code tree could map "A" to "aaaa" and "BBB" to "b". When encountering
     * the message "ABBCBBB" this changes into "aaaaaBBCb". It also tries to
     * match the longest code possible in the code tree, so if the tree maps
     * "A" to "a" and "AA" to "bb" then "AAA" would be recoded as "bba".
     *
     * @param {CodeTree} codeTree
     * @param {RecodeOptions} options
     * @return {Message}
     */
    recode(codeTree, options) {
        options = options || {};
        let i = 0;
        const result = [];

        while (i < this.value.length) {
            const bestCodeResult = this.recodeFindBestCode(i, codeTree);

            if (bestCodeResult) {
                const chunk = new MessageChunk(
                    bestCodeResult.value,
                    this.positions.slice(i, i + bestCodeResult.length + 1)
                );
                result.push({
                    messageChunk: chunk,
                    type: CODED
                });
                i += bestCodeResult.length;
            } else {
                result.push({
                    messageChunk: this.charAt(i),
                    type: UNCODED
                });
                i += 1;
            }
        }

        this.recodeHandlePad(result, options);
        const resultMessage = new Message();

        for (const item of result) {
            resultMessage.append(item.messageChunk);
        }

        return resultMessage;
    }

    /**
     * Finds the best code that matches at the current position.
     *
     * @param {number} startPosition
     * @param {CodeTree} codeTree
     * @return {Object?}
     */
    recodeFindBestCode(startPosition, codeTree) {
        let codeResult = codeTree.get(this.value.substr(startPosition, 1));
        const oldCodeResults = [];
        let length = 1;

        while (
            codeResult &&
            codeResult.hasChild &&
            startPosition + length < this.length
        ) {
            oldCodeResults.push(codeResult);
            length += 1;
            codeResult = codeTree.get(this.value.substr(startPosition, length));
        }

        while (oldCodeResults.length && (!codeResult || !codeResult.value)) {
            codeResult = oldCodeResults.pop();
        }

        if (codeResult && codeResult.value) {
            return codeResult;
        }

        return null;
    }

    /**
     * Removes and adds padding based on options.
     *
     * @param {Array.<MessageChunk>} result
     * @param {RecodeOptions} options
     */
    recodeHandlePad(result, options) {
        // Change options into a faster format for lookups.
        const option = {
            CODED: {
                CODED: {
                    add: options.padAddCodedToCoded,
                    remove: options.padRemoveCodedToCoded
                },
                UNCODED: {
                    add: options.padAddCodedToUncoded,
                    remove: options.padRemoveCodedToUncoded
                }
            },
            UNCODED: {
                CODED: {
                    add: options.padAddUncodedToCoded,
                    remove: options.padRemoveUncodedToCoded
                },
                UNCODED: {
                    add: options.padAddUncodedToUncoded,
                    remove: options.padRemoveUncodedToUncoded
                }
            }
        };

        // Handle removing pads. Pads must always be UNCODED chunks.
        for (let i = result.length - 1; i >= 2; i -= 1) {
            if (
                result[i - 1].type === UNCODED &&
                option[result[i - 2].type][result[i].type].remove ===
                    result[i - 1].messageChunk.value
            ) {
                result.splice(i - 1, 1);
                i -= 1;
            }
        }

        // Handle adding pads.
        for (let i = 1; i < result.length; i += 1) {
            const add = option[result[i - 1].type][result[i].type].add;

            if (add) {
                result.splice(i, 0, {
                    messageChunk: new MessageChunk(
                        add,
                        result[i].messageChunk.positions
                    ),
                    type: UNCODED
                });
                i += 1;
            }
        }
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
     * Removes a chunk from the message and potentially inserts a chunk at the
     * position.
     *
     * @param {number} start
     * @param {number} len
     * @param {MessageChunk?} insert
     * @return {MessageChunk}
     */
    splice(start, len, insert) {
        const removed = this.substr(start, len);
        const left = this.substr(0, start);
        const right = this.substr(start + len, this.length);

        if (insert) {
            left.append(insert);
        }

        left.append(right);
        this.value = left.getValue();
        this.positions = right.getPositions();
        valueUpdated(this);

        return removed;
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
        let end = start + len;

        if (end > this.value.length) {
            end = this.value.length;
        }

        const positions = this.positions.slice(start, end + 1);

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
