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

        // All characters in the language. Order does not matter. Includes
        // characters that are typically translated before ciphering.
        this.characterSets = {};

        // This is similar to letterOrder, except a character is the key and
        // its index is the value. To create this, call this.updateIndexes().
        this.letterOrderIndex = {};

        // This is to fold accented characters into unaccented characters.
        this.translations = {};

        // The name of the language is *in* the language, not the English
        // version of the language's name.
        this.name = "Alphabet";

        // When padding messages, what character is often used to pad?
        this.padChar = "";
    }


    /**
     * Create a copy of the current alphabet.
     *
     * @return {Alphabet}
     */
    clone() {
        var copy;

        /**
         * Copies an object. Deep copy via recursion.
         *
         * @param {Object} src
         * @return {Object}
         */
        function cloneObject(src) {
            var i, keys, result, value;

            result = {};
            keys = Object.keys(src);

            for (i = 0; i < keys.length; i += 1) {
                value = src[keys[i]];

                if (value && typeof value === "object") {
                    value = cloneObject(value);
                }

                result[keys[i]] = value;
            }

            return result;
        }

        copy = new Alphabet();
        copy.characterSets = cloneObject(this.characterSets);
        copy.length = this.length;
        copy.letterOrder = cloneObject(this.letterOrder);
        copy.letterOrderIndex = cloneObject(this.letterOrderIndex);
        copy.translations = cloneObject(this.translations);
        copy.name = this.name;
        copy.padChar = this.padChar;

        return copy;
    }


    /**
     * Removes a letter from the alphabet, collapsing the alphabet by one
     * letter. You can use this to change a 26 letter alphabet into a
     * 25 letter alphabet for those grid-based ciphers.
     *
     * @param {string} from
     * @param {string} to
     * @return {Alphabet}
     */
    collapse(from, to) {
        var copy, fromIndex, toIndex;

        fromIndex = this.toIndex(from);
        toIndex = this.toIndex(to);
        copy = this.clone();

        if (fromIndex === -1 || toIndex === -1) {
            return copy;
        }

        Object.keys(copy.letterOrder).forEach((setName) => {
            // Set up the translation before the indexes change
            const letters = copy.letterOrder[setName];
            copy.translations[letters.charAt(fromIndex)] = letters.charAt(toIndex);

            // Remove the character
            copy.letterOrder[setName] = letters.substr(0, fromIndex) + letters.substr(fromIndex + 1);
        });

        copy.length -= 1;
        copy.updateIndexes();

        return copy;
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
            if (indexes[i] !== -1 && !valuesFound[indexes[i]]) {
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
     * With this method, the letter "A" will often have the index of 0.
     *
     * This will take a word like "BAD" and change it to an array [1, 0, 3].
     *
     * @param {string} value
     * @return {Array.<number>}
     */
    findLetterIndexes(value) {
        var i, indexes;

        indexes = [];

        for (i = 0; i < value.length; i += 1) {
            indexes.push(this.toIndex(value.charAt(i)));
        }

        return indexes;
    }


    /**
     * Test if a character is a letter. This includes any letter from the
     * characterSets.
     *
     * @param {string} c
     * @return {boolean}
     */
    isLetter(c) {
        var i, keys;

        keys = Object.keys(this.characterSets);

        for (i = 0; i < keys.length; i += 1) {
            if (this.characterSets[keys[i]].includes(c)) {
                return true;
            }
        }

        return false;
    }


    /**
     * Rekeys all letterOrder alphabet strings with the list of indexes
     * supplied. No validity checking is done here, so pass a good list
     * of character indexes.
     *
     * @param {Array.<number>} indexes
     * @return {Alphabet}
     */
    keyAlphabetByIndexes(indexes) {
        var alphabet, copy, i, index, keys, shuffled;

        copy = this.clone();
        keys = Object.keys(copy.letterOrder);

        for (i = 0; i < keys.length; i += 1) {
            alphabet = copy.letterOrder[keys[i]];
            shuffled = "";

            for (index = 0; index < indexes.length; index += 1) {
                shuffled += alphabet.charAt(indexes[index]);
            }

            copy.letterOrder[keys[i]] = shuffled;
        }

        copy.updateIndexes();

        return copy;
    }


    /**
     * Key the alphabet and create a new Alphabet instance.
     *
     * @param {string} value
     * @param {KeyOptions} keyOptions
     * @return {Alphabet}
     */
    keyWord(value, keyOptions) {
        var alphabetIndexes, i, indexes, keyIndexes;

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
            if (keyIndexes.indexOf(i) === -1) {
                alphabetIndexes.push(i);
            }
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
        return this.keyAlphabetByIndexes(indexes);
    }


    /**
     * Changes a letter to match the case of another character in the same
     * alphabet. One can use this when a cipher changes all of the letters to
     * uppercase or lowercase and you want it to match what was originally
     * entered.
     *
     * Examples
     *
     *     // Returns a capital "A" because "Z" is capitalized and "a" is
     *     // the value.
     *     console.log(alphabet.matchCase("Z", "a"));
     *
     *     // Returns the number 7 because it's not in any letter set.
     *     console.log(alphabet.matchCase("Z", 7));
     *
     *     // Returns ß because it's not in any letter set. This letter
     *     // should be coded as "ss" instead.
     *     console.log(alphabet.matchCase("Z", "ß"));
     *
     * @param {string} referenceLetter Determines capitalization
     * @param {string} value
     * @return {string}
     */
    matchCase(referenceLetter, value) {
        var i, orderNames, refIndex, valueIndex;

        valueIndex = this.toIndex(value);

        if (valueIndex === -1) {
            // Could not find the value index.
            return value;
        }

        orderNames = Object.keys(this.characterSets);

        for (i = 0; i < orderNames.length; i += 1) {
            refIndex = this.characterSets[orderNames[i]].indexOf(referenceLetter);

            if (refIndex > -1) {
                return this.letterOrder[orderNames[i]].charAt(valueIndex);
            }
        }

        // Couldn't find a reference letter group.
        return value;
    }


    /**
     * Returns the index of a given letter. If that character is not defined
     * by the current alphabet, this returns -1.
     *
     * @param {string} c character representation
     * @return {number} index value
     */
    toIndex(c) {
        var i;

        i = this.letterOrderIndex[c];

        if (typeof i === "undefined") {
            return -1;
        }

        return i;
    }


    /**
     * Convert an index back to a letter. Invalid indexes wrap around, so
     * using English and an index of -1 will return "Z" and the index of 26
     * will return "A".
     *
     * @param {number} i index value
     * @return {string} character representation
     */
    toLetter(i) {
        i %= this.letterOrder.upper.length;

        if (i < 0) {
            i += this.letterOrder.upper.length;
        }

        return this.letterOrder.upper.charAt(i);
    }


    /**
     * Convert an index back to all letters. Invalid indexes are changed to
     * an empty string.
     *
     * @param {number} index value
     * @return {string} character representation
     */
    toLetters(index) {
        var i, keys, result;

        keys = Object.keys(this.letterOrder);
        result = "";

        if (index >= 0) {
            for (i = 0; i < keys.length; i += 1) {
                if (index < this.letterOrder[keys[i]].length) {
                    result += this.letterOrder[keys[i]].charAt(index);
                }
            }
        }

        return result;
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

        for (i = 0; i < keys.length; i += 1) {
            str = str.replace(new RegExp(`[${keys[i]}]`, "g"), this.translations[keys[i]]);
        }

        return str;
    }


    /**
     * Updates the indexes. Subclasses need to call this method during
     * construction.
     */
    updateIndexes() {
        var groups, i, index, letters, pos;

        groups = Object.keys(this.letterOrder);
        index = {};

        for (i = 0; i < groups.length; i += 1) {
            letters = this.letterOrder[groups[i]];

            for (pos = 0; pos < letters.length; pos += 1) {
                index[letters.charAt(pos)] = pos;
            }
        }

        this.letterOrderIndex = index;
    }
};
