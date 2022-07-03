/* Baconian Cipher
 *
 * Maps a letter to its index, encoded as binary. The intent is to hide a
 * message in another benign message by using a different typeface or emphasis.
 *
 * A is 00000 (or "aaaaa"), B is 00001 (or "aaaab"), etc. A message like "dad"
 * is encoded to 00011 00000 00011, then that is mapped to a message. Let's
 * map it to "all things bright" and make all "on" bits into uppercase:
 *
 *     Text: "all THings brigHT".
 *     Code:  000 110000 000011
 *
 * This only converts to binary or "aaaab" style notations.
 */

"use strict";

/**
 * @typedef {Object} BaconianOptions
 * @property {boolean} [binary=false]
 */

const baconianCodeTree = require("../code-tree/baconian");
const baconianMap = require("../alphabet-map/baconian");

module.exports = {
    /**
     * Convert both the binary Baconian cipher and the "aaaab" representation
     * back to plaintext.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @return {Message}
     */
    decode(message, alphabet) {
        const codeTree = baconianCodeTree(alphabet);
        const result = message.recode(codeTree);

        return result;
    },

    /**
     * Convert letters to the encoded binary of Baconian cipher.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {BaconianOptions} options
     * @return {Message}
     */
    encode(message, alphabet, options) {
        if (!options) {
            options = {};
        }

        options.binary = !!options.binary;
        const map = baconianMap(alphabet, options.binary);
        const result = message.map(map);

        return result;
    }
};
