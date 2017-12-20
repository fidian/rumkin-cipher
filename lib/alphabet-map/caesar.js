"use strict";

var mapUtil;

mapUtil = require("./map-util");

/**
 * Create a shift cipher letter mapping.
 *
 * @param {Alphabet} alphabet
 * @param {number} shift Integer.
 * @return {Object} letter map
 */
module.exports = (alphabet, shift) => {
    var from, groupIndex, groups, index, letters, map, to;

    map = {};

    // Normalize the shift amount
    shift %= alphabet.length;
    shift = (alphabet.length + shift) % alphabet.length;

    // Normal letters
    groups = Object.keys(alphabet.letterOrder);

    for (groupIndex = 0; groupIndex < groups.length; groupIndex += 1) {
        letters = alphabet.letterOrder[groups[groupIndex]];

        for (index = 0; index < alphabet.length; index += 1) {
            from = letters.charAt(index);
            to = letters.charAt((index + shift) % alphabet.length);
            map[from] = to;
        }
    }

    mapUtil.mapTranslations(alphabet, map);

    return map;
};
