"use strict";

/**
 * Create an Affine cipher letter mapping.
 *
 * @param {Alphabet} alphabet
 * @param {number} multiplier Integer, not zero, coprime to alphabet length.
 * @param {number} shift Integer.
 * @return {Object} letter map
 */
module.exports = (alphabet, multiplier, shift) => {
    var from, groupIndex, groups, index, len, letters, map, to;

    map = {};
    len = alphabet.length;

    // Normalize the shift amount
    shift %= len;
    shift = (len + shift) % len;

    // Normal letters
    groups = Object.keys(alphabet.letterOrder);

    for (groupIndex = 0; groupIndex < groups.length; groupIndex += 1) {
        letters = alphabet.letterOrder[groups[groupIndex]];

        for (index = 0; index < len; index += 1) {
            from = letters.charAt(index);
            to = letters.charAt((index * multiplier + shift) % len);
            map[from] = to;
        }
    }

    // Now handle the translated characters
    groups = Object.keys(alphabet.translations);

    for (groupIndex = 0; groupIndex < groups.length; groupIndex += 1) {
        from = groups[groupIndex];
        letters = alphabet.translations[from];
        to = "";

        for (index = 0; index < letters.length; index += 1) {
            to += map[letters.charAt(index)];
        }

        map[from] = to;
    }

    return map;
};
