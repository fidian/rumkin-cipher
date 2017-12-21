/* Baconian Cipher
 *
 * Maps a letter to its index, encoded as binary. The intent is to hide a
 * message in another benign message by using a different typeface or emphasis.
 *
 * A is 00000 (or "aaaaa"), B is 00001 (or "aaaab"), etc. A message like "dad"
 * is encoded to 00011 00000 00011, then that is mapped to a message. Let's
 * map it to "all things bright" and make all "on" bits into uppercase:
 * "all THings brigHT".
 *
 * This only converts to binary or "aaaab" style notations.
 */

"use strict";

/**
 * @typedef {Object} BaconianOptions
 * @property {boolean} [binary=false]
 */

var baconianCodeTree, baconianMap;

baconianCodeTree = require("../code-tree/baconian");
baconianMap = require("../alphabet-map/baconian");

module.exports = {
    /**
     * Convert both the binary Baconian cipher and the "aaaab" representation
     * back to plaintext.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @return {Message}
     */
    decipher(message, alphabet) {
        var codeTree;

        codeTree = baconianCodeTree(alphabet);
        message.recode(codeTree);

        return message;
    },

    /**
     * Convert letters to the encoded binary of Baconian cipher.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {BaconianOptions} options
     * @return {Message}
     */
    encipher(message, alphabet, options) {
        var map;

        if (!options) {
            options = {};
        }

        options.binary = !!options.binary;
        map = baconianMap(alphabet, options.binary);
        message.map(map);

        return message;
    }
};
