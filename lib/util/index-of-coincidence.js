"use strict";

var kappaPlaintext;

/**
 * Friedman's Index of Coincidence.
 *
 * This saves a bit of calculation if you already have the kappa plaintext
 * score available. However, there's a careful bit to understand. The
 * length of the alphabet is used when calculating the Friedman IC. Kappa
 * Plaintext calculates a number and includes spaces, symbols, and everything
 * else (when not previously filtered). That means the two stats, which are
 * used in tandem, are not really measuring the same thing unless the
 * message is filtered. So, you have two good options:
 *
 *     // Option 1: Calculate separate statistics
 *     kappa = kappaPlaintext(message);
 *     ic = indexOfCoincidence(message, alphabet);
 *
 *     // Option 2: Prefilter the message and pass kappa to ic
 *     filtered = message.separate(alphabet);
 *     kappa = kappaPlaintext(filtered);
 *     ic = indexOfCoincidence(filtered, alphabet, kappa);
 *
 * @param {Message} message
 * @param {Alphabet} alphabet
 * @param {number} [kappaPlaintextScore]
 * @return {number}
 */
function indexOfCoincidence(message, alphabet, kappaPlaintextScore) {
    var filteredMessage;

    if (!kappaPlaintextScore) {
        // Only tally letters. Do not have spaces, punctuation, numbers.
        filteredMessage = message.separate(alphabet);
        kappaPlaintextScore = kappaPlaintext(filteredMessage);
    }

    return kappaPlaintextScore * alphabet.length;
}

kappaPlaintext = require("./kappa-plaintext");
module.exports = indexOfCoincidence;
