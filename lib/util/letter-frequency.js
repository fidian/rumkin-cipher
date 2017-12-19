"use strict";

/**
 * Calculate each letter's frequencies from a given message.
 *
 * @param {Message} message
 * @return {Object} Frequencies (counts) for each character.
 */
function letterFrequency(message) {
    var c, i, inputStr, result;

    result = {};
    inputStr = message.toString();

    for (i = 0; i < inputStr.length; i += 1) {
        c = inputStr.charAt(i);

        if (result[c]) {
            result[c] += 1;
        } else {
            result[c] = 1;
        }
    }

    return result;
}

module.exports = letterFrequency;
