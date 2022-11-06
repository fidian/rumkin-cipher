/**
 * Telephone keypad code based on E.161 and how cell phones handle texting.
 * This is not T9.
 *
 * https://en.wikipedia.org/wiki/E.161
 *
 * Can't use a code tree because there's special processing rules for
 * capitalization, switching to different modes, and how repetitive numbers are
 * handled.
 */
"use strict";

// Nokia - seen in a video
// Does not automatically capitalize the first letter
// 1 = . , @ 1
// 2 = A B C 2
// 3 = D E F 3
// 4 = G H I 4
// 5 = J K L 5
// 6 = M N O 6
// 7 = P Q R S 7
// 8 = T U V 8
// 9 = W X Y Z 9
// 0 = space 0 (the 0 is assumed)
// # makes the next letter capitalized.
// ## switches to number mode, # switches back
// ### enables caps lock, # switches back

// Sanyo - gathered from manual
// Auto caps first letter of word (starts with * mode enabled)
// 1 = . , @ 1 ? ! * # /
// 2 = A B C 2
// 3 = D E F 3
// 4 = G H I 4
// 5 = J K L 5
// 6 = M N O 6
// 7 = P Q R S 7
// 8 = T U V 8
// 9 = W X Y Z 9
// 0 means "next" while letter is highlighted, 0 otherwise
// # is space
// * is caps next letter, ** is caps lock
//
// Spanish: 1 = , . @ 1 ¿ ? ¡ ! * # /
// 2 = A Á B C 2
// 3 = D E É F 3
// 4 = G H I Í 4
// 6 = M N Ñ O Ó 6
// 8 = T U Ú Ü V 8

// Implementation:
// Assume we are speed texting and mostly using a Nokia implementation.
// Goal is to encode as many letters as possible for the given alphabet.
// Do not start with automatic capitalization
// Numbers 1-9 act like Sanyo, since they seem more complete and are the same with Nokia.
// 0 acts like Nokia (0 = space 0)
// # capitalizes next letter
// ## switches to number mode, # switches back to lowercase
// ### turns on caps lock, # switches back to lowercase
// * is "next" for doubled letters

/**
 * @param {Alphabet} alphabet
 * @return {Object}
 */
function getLettersByAlphabet(alphabet) {
    const name = alphabet ? alphabet.name : "English";
    const letters = {
        1: [".", ",", "@", "1", "?", "!", "*", "#"],
        2: ["a", "b", "c", "2"],
        3: ["d", "e", "f", "3"],
        4: ["g", "h", "i", "4"],
        5: ["j", "k", "l", "5"],
        6: ["m", "n", "o", "6"],
        7: ["p", "q", "r", "s", "7"],
        8: ["t", "u", "v", "8"],
        9: ["w", "x", "y", "z", "9"],
        0: [" ", "0"]
    };

    switch (name) {
        case "Deutsch":
            letters["2"] = ["a", "ä", "b", "c", "2"];
            letters["6"] = ["m", "n", "o", "ö", "6"];
            letters["7"] = ["p", "q", "r", "s", "ß", "7"];
            letters["8"] = ["t", "u", "ü", "v", "8"];
            break;

        case "Español":
            letters["1"] = [".", ",", "@", "1", "¿", "?", "¡", "!", "*", "#"];
            letters["2"] = ["a", "á", "b", "c", "2"];
            letters["3"] = ["d", "e", "é", "f", "3"];
            letters["3"] = ["g", "h", "i", "í", "4"];
            letters["6"] = ["m", "n", "ñ", "o", "ó", "6"];
            letters["8"] = ["t", "u", "ú", "ü", "v", "8"];
            break;
    }

    return letters;
}

/**
 * @param {Alphabet} alphabet
 * @return {Array.<string>}
 */
function getCodeList(alphabet) {
    const letters = getLettersByAlphabet(alphabet);
    const result = [];

    for (const [k, v] of Object.entries(letters)) {
        for (let i = v.length; i >= 0; i -= 1) {
            result.push({
                from: k.repeat(i + 1),
                to: v[i]
            });
        }
    }

    return result;
}

/**
 * Returns characters used for switching modes and splitting double letters.
 *
 * @return {Object}
 */
function getCommandConfig() {
    return {
        "*": "NEXT",
        "#": "CAPS",
        "##": "NUM_LOCK",
        "###": "CAPS_LOCK"
    };
}

module.exports = {
    /**
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @return {Message}
     */
    decode(message, alphabet) {
    },

    /**
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @return {Message}
     */
    encode(message, alphabet) {}
};
