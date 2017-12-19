"use strict";

var kappaPlaintext;

/**
 * Friedman's Index of Coincidence.
 *
 * This saves a bit of calculation if you already have the kappa plaintext
 * score available.
 *
 * @param {Message} message
 * @param {Alphabet} alphabet
 * @param {number} [kappaPlaintextScore]
 * @return {number}
 */
function indexOfCoincidence(message, alphabet, kappaPlaintextScore) {
    if (!kappaPlaintextScore) {
        kappaPlaintextScore = kappaPlaintext(message);
    }

    return kappaPlaintextScore * alphabet.length;
}

kappaPlaintext = require("./kappa-plaintext");
module.exports = indexOfCoincidence;
