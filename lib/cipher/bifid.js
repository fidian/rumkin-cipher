"use strict";

var Message, MessageChunk, PolybiusSquare;

Message = require("../util/message");
MessageChunk = require("../util/message-chunk");
PolybiusSquare = require("../util/polybius-square");


module.exports = {
    /**
     * Deciphers a Bifid cipher.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @return {Message}
     */
    decipher(message, alphabet) {
        var c, chars, chunk, half, i, index, lettersOnly, result, square;

        result = new Message();
        square = new PolybiusSquare(alphabet);
        message = message.translate(alphabet);
        lettersOnly = message.separate(alphabet);
        chars = [];

        // Split each character into the half characters
        for (i = 0; i < lettersOnly.length; i += 1) {
            c = lettersOnly.charAt(i);
            index = square.indexOf(c.getValue());
            chars.push({
                index: index[0],
                positions: c.getPositions()
            });
            chars.push({
                index: index[1],
                positions: c.getPositions()
            });
        }

        half = chars.length / 2;

        // Join back into a message
        for (i = 0; i < half; i += 1) {
            c = square.charAt(chars[i].index, chars[i + half].index);
            chunk = new MessageChunk(c, chars[i].positions.concat(chars[i + half].positions));
            result.append(chunk);
        }

        result = message.overlay(alphabet, result);

        return result;
    },


    /**
     * Enciphers a Bifid cipher.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @return {Message}
     */
    encipher(message, alphabet) {
        var char, chars, halfChar, i, lettersOnly, result, square;

        /**
         * Adds half a character to the result.
         *
         * @param {number} index
         * @param {Array.<number>} positions
         */
        function addHalfChar(index, positions) {
            var c, chunk;

            if (halfChar) {
                c = square.charAt(halfChar.index, index);
                chunk = new MessageChunk(c, halfChar.positions.concat(positions));
                result.append(chunk);
                halfChar = null;
            } else {
                halfChar = {
                    index,
                    positions
                };
            }
        }

        result = new Message();
        halfChar = null;
        square = new PolybiusSquare(alphabet);
        message = message.translate(alphabet);
        lettersOnly = message.separate(alphabet);
        chars = [];

        for (i = 0; i < lettersOnly.length; i += 1) {
            char = {
                chunk: lettersOnly.charAt(i)
            };
            char.positions = char.chunk.getPositions();
            char.index = square.indexOf(char.chunk.getValue());
            chars.push(char);
        }

        // Add first index
        for (i = 0; i < chars.length; i += 1) {
            addHalfChar(chars[i].index[0], chars[i].positions);
        }

        // Add second index
        for (i = 0; i < chars.length; i += 1) {
            addHalfChar(chars[i].index[1], chars[i].positions);
        }

        result = message.overlay(alphabet, result);

        return result;
    }
};
