"use strict";

var mapUtil;

mapUtil = require("./map-util");

/**
 * Encode a number as a Baconian type string.
 *
 * @param {number} bits
 * @param {number} num
 * @param {boolean} useBinary
 * @return {string}
 */
function encode(bits, num, useBinary) {
    var str;

    str = `00000000${num.toString(2)}`;
    str = str.substr(-bits);

    if (!useBinary) {
        str = str.replace(/0/g, "a");
        str = str.replace(/1/g, "b");
    }

    return str;
}


/**
 * Create a Baconian map using a given alphabet. If the alphabet is to have
 * multiple letters mapping to a single code, then the letterOrder properties
 * must be changed and those duplicated letters moved to the translations.
 * To explain further, here's an abbreviated English example that maps `J` to
 * `I` and `V` to `U`.
 *
 *     alphabet = alphabet.collapse("J", "I").collapse("V", "U");
 *
 * @param {Alphabet} alphabet
 * @param {boolean} useBinary
 * @return {Object} letter map
 */
module.exports = (alphabet, useBinary) => {
    var bits, groupIndex, groups, index, letters, map;

    map = {};
    bits = Math.ceil(Math.log2(alphabet.length));

    // Normal letters
    groups = Object.keys(alphabet.letterOrder);

    for (groupIndex = 0; groupIndex < groups.length; groupIndex += 1) {
        letters = alphabet.letterOrder[groups[groupIndex]];

        for (index = 0; index < alphabet.length; index += 1) {
            map[letters.charAt(index)] = encode(bits, index, useBinary);
        }
    }

    mapUtil.mapTranslations(alphabet, map);

    return map;
};
