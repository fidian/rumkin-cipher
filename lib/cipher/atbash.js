/* Atbash Cipher
 *
 * This maps a letter according to the reversible table below. Encryption
 * is the same as decryption.
 *
 * A <-> Z    B <-> Y    C <-> X    D <-> W    E <-> V    F <-> U
 * G <-> T    H <-> S    I <-> R    J <-> Q    K <-> P    L <-> O
 * M <-> N
 */

"use strict";

var reverseAlphabetMap;

reverseAlphabetMap = require("../alphabet-map/reverse");

/**
 * The encipher/decipher function.
 *
 * @param {Message} message
 * @param {Alphabet} alphabet
 * @return {Message}
 */
function cipher(message, alphabet) {
    var map;

    map = reverseAlphabetMap(alphabet);
    message.map(map);

    return message;
}

module.exports = {
    decipher: cipher,
    encipher: cipher
};
