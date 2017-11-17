"use strict";

/**
 * @typedef {Object} KeyOptions
 * @property {boolean} useLastInstance Use the last occurrence of a letter instead of the first.
 * @property {boolean} reverseKey Reverse the key before keying.
 * @property {boolean} reverseAlphabet Reverse the alphabet before keying.
 * @property {boolean} keyAtEnd Put key on the right side.
 */

module.exports = class Alphabet {
    /**
     * Builds a set of ordered letters for a specific alphabet.
     *
     * This is a base class and should be extended.
     */
    constructor() {
        // Caches
        this.cacheShiftBySize = {};

        // How many letters in the alphabet. Used for letter shifts.
        this.length = 0;

        // Order of letters. Each of the values must have exactly the same
        // number of letters, and that must match this.length.
        this.letterOrder = {};

        // This is to fold accented characters into unaccented characters.
        this.translations = {};

        // The name of the language is *in* the language, not the English
        // version of the language's name.
        this.name = "Alphabet";
    }


    /**
     * Filters key indexes. Removes any that are -1. If there are duplicates,
     * handles them according to the duplicateRule.
     *
     * * first: Keep only the first value.
     * * last: Keep only the last value.
     *
     * @param {Array.<number>} indexes
     * @param {string} duplicateRule
     * @return {Array.<number>}
     */
    filterKeyIndexes(indexes, duplicateRule) {
        var i, result, valuesFound;

        valuesFound = {};
        result = [];

        if (duplicateRule === "last") {
            indexes = indexes.reverse();
        }

        for (i = 0; i < indexes.length; i += 1) {
            if (!valuesFound[indexes[i]]) {
                valuesFound[indexes[i]] = true;
                result.push(indexes[i]);
            }
        }

        if (duplicateRule === "last") {
            result = result.reverse();
        }

        return result;
    }


    /**
     * Finds the index of each letter in the letterOrder lists. If not found,
     * the letters are assigned an index of -1.
     *
     * @param {string} value
     * @return {Array.<number>}
     */
    findLetterIndexes(value) {
        var i, indexes, letter, orderIndex, orderKeys, pos;

        indexes = [];
        orderKeys = Object.keys(this.letterOrder);

        for (i = 0; i < value.length; i += 1) {
            letter = value.charAt(i);

            for (orderIndex = 0; orderIndex < orderKeys.length && pos === -1; orderIndex += 1) {
                pos = this.letterOrder[orderKeys[orderIndex]].indexOf(letter);
            }

            indexes.push(pos);
        }

        return indexes;
    }


    /**
     * Rekeys all letterOrder alphabet strings with the list of indexes
     * supplied. No validity checking is done here, so pass a good list
     * of character indexes.
     *
     * @param {Array.<number>} indexes
     * @return {this}
     */
    keyAlphabetByIndexes(indexes) {
        var alphabet, i, index, keys, shuffled;

        keys = Object.keys(this.letterOrder);

        for (i = 0; i < keys.length; i += 1) {
            alphabet = this.letterOrder[keys[i]];
            shuffled = "";

            for (index = 0; index < indexes.length; index += 1) {
                shuffled += alphabet.charAt(indexes[index]);
            }

            this.letterOrder[keys[i]] = shuffled;
        }

        return this;
    }


    /**
     * Key the alphabet and create a new Alphabet instance.
     *
     * @param {string} value
     * @param {KeyOptions} keyOptions
     * @return {Alphabet}
     */
    keyWord(value, keyOptions) {
        var alphabetIndexes, copy, i, indexes, keyIndexes;

        keyOptions = keyOptions || {};
        alphabetIndexes = [];

        if (keyOptions.reverseKey) {
            value = value.split("").reverse().join("");
        }

        // Change the key to a set of indexes.
        keyIndexes = this.findLetterIndexes(value);

        // Filter invalids and keep the first or last occurrence.
        if (keyOptions.useLastInstance) {
            keyIndexes = this.filterKeyIndexes(keyIndexes, "last");
        } else {
            keyIndexes = this.filterKeyIndexes(keyIndexes, "first");
        }

        for (i = 0; i < this.length; i += 1) {
            alphabetIndexes.push(i);
        }

        if (keyOptions.reverseAlphabet) {
            alphabetIndexes = alphabetIndexes.reverse();
        }

        if (keyOptions.keyAtEnd) {
            indexes = alphabetIndexes.concat(keyIndexes);
        } else {
            indexes = keyIndexes.concat(alphabetIndexes);
        }

        // Rebuilds the keyed alphabet
        copy = this.clone();
        copy.keyAlphabetByIndexes(indexes);

        return copy;
    }

    /**
     * Create a copy of the current alphabet.
     *
     * @return {Alphabet}
     */
    clone() {
        var copy;

        /**
         * Copies an object. Shallow copy, only good for maps and such.
         * No type checking performed.
         *
         * @param {Object} src
         * @return {Object}
         */
        function cloneObject(src) {
            var i, keys, result;

            result = {};
            keys = Object.keys(src);

            for (i = 0; i < keys.length; i += 1) {
                result[keys[i]] = src[keys[i]];
            }

            return result;
        }

        copy = new Alphabet();
        copy.length = this.length;
        copy.letterOrder = cloneObject(this.letterOrder);
        copy.translations = cloneObject(this.translations);
        copy.name = this.name;

        return copy;
    }


    /**
     * Builds a list of letter translations when given a number of letters
     * to shift.
     *
     * The maps are cached.
     *
     * @param {number} shift From 1 to this.length, inclusive.
     * @return {Object} Letter mapping
     */
    shiftLetterMap(shift) {
        var length, map;

        if (this.cacheShiftBySize[shift]) {
            return this.cacheShiftBySize[shift];
        }

        map = {};
        length = this.length;

        // Normal letters
        Object.keys(this.letterOrder).forEach((letterSet) => {
            var from, index, letters, to;

            letters = this.letterOrder[letterSet];

            for (index = 0; index < length; index += 1) {
                from = letters[index];
                to = letters[(index + shift) % length];
                map[from] = to;
            }
        });

        // Now handle the map characters
        Object.keys(this.translations).forEach((accentLetter) => {
            var index, normalLetters, shiftedLetters;

            normalLetters = this.translations[accentLetter];
            shiftedLetters = "";

            for (index = 0; index < normalLetters.length; index += 1) {
                shiftedLetters += map[normalLetters.charAt(index)];
            }

            map[accentLetter] = shiftedLetters;
        });

        this.cacheShiftBySize[shift] = map;

        return map;
    }


    /**
     * Translates a string by replacing characters from this.translations
     * into the translated characters.
     *
     * @param {string} str
     * @return {string}
     */
    translateString(str) {
        var i, keys;

        keys = Object.keys(this.translations);
        console.log("Transate string");

        for (i = 0; i < keys.length; i += 1) {
            console.log("Replace", keys[i], "with", this.translations[keys[i]]);
            str.replace(new RegExp(`\\${keys[i]}`, "g"), this.translations[keys[i]]);
        }

        return str;
    }
};
