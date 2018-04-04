"use strict";

module.exports = class PolybiusSquare {
    /**
     * Creates a Polybius Square.
     *
     * @param {Alphabet} alphabet
     */
    constructor(alphabet) {
        var i, l, letters, size, x, y;

        // Pick the largest square that is up to the size of the alphabet.
        size = 1;

        while (size * size <= alphabet.length) {
            size += 1;
        }

        size -= 1;

        if (size < 1) {
            throw new Error("Unable to make Polybius Square with size less than 1");
        }

        this.size = size;
        this.indexes = {};
        this.square = [];
        i = 0;

        for (x = 1; x <= size; x += 1) {
            this.square[x] = [];

            for (y = 1; y <= size; y += 1) {
                this.square[x][y] = alphabet.toLetter(i);
                letters = alphabet.toLetters(i);
                i += 1;

                for (l = 0; l < letters.length; l += 1) {
                    this.indexes[letters[l]] = [
                        x,
                        y
                    ];
                }
            }
        }
    }


    /**
     * Retrieves the index of a letter in the square.
     *
     * @param {string} letter
     * @return {Array.<number>}
     */
    indexOf(letter) {
        return this.indexes[letter];
    }


    /**
     * Retrieves a character in the square.
     *
     * @param {number} x
     * @param {number} y
     * @return {string}
     */
    charAt(x, y) {
        return this.square[x][y];
    }
};
