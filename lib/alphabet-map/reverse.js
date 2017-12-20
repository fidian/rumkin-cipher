"use strict";

var mapUtil;

mapUtil = require("./map-util");

/**
 * Create a reversed letter mapping.
 *
 * @param {Alphabet} alphabet
 * @param {number} shift Integer.
 * @return {Object} letter map
 */
module.exports = (alphabet) => {
    var from, groupIndex, groups, index, letters, map, to;

    map = {};

    // Normal letters
    groups = Object.keys(alphabet.letterOrder);

    for (groupIndex = 0; groupIndex < groups.length; groupIndex += 1) {
        letters = alphabet.letterOrder[groups[groupIndex]];

        for (index = 0; index < alphabet.length; index += 1) {
            from = letters.charAt(index);
            to = letters.charAt(alphabet.length - index - 1);
            map[from] = to;
        }
    }

    mapUtil.mapTranslations(alphabet, map);

    return map;
};
