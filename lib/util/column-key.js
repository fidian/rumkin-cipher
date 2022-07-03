"use strict";

/**
 * @typedef {Object} ColumnKeyOptions
 * @property {boolean} columnOrder If true, columns represent the column order (backwards)
 * @property {boolean} dupesBackwards If true, number duplicates backwards
 *
 * If the key is "4 4 2 2 3", then it will normally result in "3 4 0 1 2"
 * because of zero-based numbering. With dupesBackwards=true, it is
 * "4 3 1 0 2".  With columnOrder=true it is "2 3 4 0 1". With
 * dupesBackward=true and columnOrder=true it is "3 2 4 1 0"
 */

/**
 * @typedef {Object} KeyRaw
 * @property {number} index
 * @property {number} value
 */

/**
 * Standardize the options
 *
 * @param {Alphabet} alphabet
 * @param {?ColumnKeyOptions} options
 * @return {ColumnKeyOptions}
 */
function standardizeOptions(alphabet, options) {
    if (!options) {
        options = {};
    }

    options.columnOrder = !!options.columnOrder;
    options.dupesBackwards = !!options.dupesBackwards;

    return options;
}

/**
 * Split the key into raw chunks. Handles number conversion and alphabet index
 * lookup. No deduplication.
 *
 * @param {Alphabet} alphabet
 * @param {string} key
 * @return {Array.<KeyRaw>}
 */
function splitKey(alphabet, key) {
    const result = [];
    let i = 0;

    /**
     * Adds a value to the result
     *
     * @param {number} n
     */
    function add(n) {
        result.push({
            value: n,
            index: result.length
        });
    }

    /**
     * Starting at key.charAt[i], read the number. Leaves i at the first
     * non-digit and returns the parsed number. If no digits are read,
     * this returns null.
     *
     * @return {number|null}
     */
    function slurpNumber() {
        let cc = key.charAt(i);
        let processed = 0;
        let num = 0;

        while (cc >= "0" && cc <= "9") {
            processed += 1;
            num *= 10;
            num += +cc;
            i += 1;
            cc = key.charAt(i);
        }

        if (processed) {
            return num;
        }

        return null;
    }

    while (i < key.length) {
        const c = key.charAt(i);

        if (c === "-") {
            i += 1;
            const num = slurpNumber();

            if (num !== null) {
                add(num * -1);
            }
        } else if (c >= "0" && c <= "9") {
            add(slurpNumber());
        } else {
            const index = alphabet.toIndex(c);

            if (index >= 0) {
                add(index);
            }

            i += 1;
        }
    }

    return result;
}

/**
 * Renumber the indexes. Resulting array has all digits from 0 to N.
 *
 * @param {Array.<KeyRaw>} keyRaw
 * @param {boolean} dupesBackwards
 * @return {Array.<number>}
 */
function deduplicateKey(keyRaw, dupesBackwards) {
    // Sort a copy of the initial array
    const copy = keyRaw.slice();
    const dupesMultiplier = dupesBackwards ? -1 : 1;
    copy.sort((a, b) => {
        if (a.value < b.value) {
            return -1;
        }

        if (a.value > b.value) {
            return 1;
        }

        if (a.index < b.index) {
            return -1 * dupesMultiplier;
        }

        return dupesMultiplier;
    });

    return keyRaw.map((item) => copy.indexOf(item));
}

/**
 * Generate a column key, a list of numbers from 0 through N with no gaps. This
 * is based on the key passed in and the options. The key can be numbers or
 * letters. Other characters are skipped. Numbers are taken verbatim and
 * letters are converted into the index of that letter in the alphabet.
 * Duplicates are handled via options.
 *
 * @param {Alphabet} alphabet
 * @param {string} key
 * @param {?ColumnKeyOptions} options
 * @return {Array.<number>}
 */
module.exports = function columnKey(alphabet, key, options) {
    options = standardizeOptions(alphabet, options);
    const translatedKey = alphabet.translateString(key);
    const keyRaw = splitKey(alphabet, translatedKey);
    const ordered = deduplicateKey(keyRaw, options.dupesBackwards);

    if (!options.columnOrder) {
        return ordered;
    }

    const reordered = [];

    for (const v of ordered) {
        reordered[ordered[v]] = v;
    }

    return reordered;
};
