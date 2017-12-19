"use strict";

var letterFrequency;

/**
 * Calculate the probability of drawing two identical characters from a given
 * pool of letters. This is the unnormalized form of the Friedman Index of
 * Coincidence.
 *
 * This will tally every character. If that's undesirable, make sure to filter
 * out illegal characters first.
 *
 * @param {Message} message
 * @param {Object} [frequencies] If you have the letter frequencies handy.
 * @return {number}
 */
function kappaPlaintext(message, frequencies) {
    var characters, f, i, ic;

    if (!frequencies) {
        frequencies = letterFrequency(message);
    }

    if (message.length < 2) {
        return 0;
    }

    ic = 0;
    characters = Object.keys(frequencies);

    for (i = 0; i < characters.length; i += 1) {
        f = frequencies[characters[i]];
        ic += f * (f - 1);
    }

    ic /= message.length * (message.length - 1);

    return ic;
}

letterFrequency = require("./letter-frequency");
module.exports = kappaPlaintext;
