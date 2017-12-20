"use strict";

module.exports = {
    /**
     * Reverses a map, making all keys into values and values into keys.
     *
     * @param {Object} map
     * @return {Object}
     */
    flip(map) {
        var i, keys, result;

        result = {};
        keys = Object.keys(map);

        for (i = 0; i < keys.length; i += 1) {
            result[map[keys[i]]] = keys[i];
        }

        return result;
    },

    /**
     * Map the translations to the remapped characters. This will change
     * things like "ß" -> "ss" and instead will use the translated characters.
     * So, for a rot13, "s" -> "ff" and this function maps "ß" -> "ff".
     *
     * @param {Alphabet} alphabet
     * @param {Object} map
     */
    mapTranslations(alphabet, map) {
        var from, i, keys, letterIndex, to, translated;

        keys = Object.keys(alphabet.translations);

        for (i = 0; i < keys.length; i += 1) {
            from = keys[i];
            translated = alphabet.translations[from];
            to = "";

            for (letterIndex = 0; letterIndex < translated.length; letterIndex += 1) {
                to += map[translated.charAt(letterIndex)];
            }

            map[from] = to;
        }
    }
};
