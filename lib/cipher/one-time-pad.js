"use strict";

var Message, MessageChunk;

Message = require("../util/message");
MessageChunk = require("../util/message-chunk");

/**
 * @typedef {Object} OneTimePadOptions
 * @param {Message} pad
 * @param {boolean=false} firstIsOne
 */

/**
 * Enciphers and deciphers a one-time pad
 *
 * @param {Message} message
 * @param {Alphabet} alphabet
 * @param {Message} pad
 * @param {boolean} firstIsOne
 * @param {number} multiplier
 * @return {Message}
 */
function otp(message, alphabet, pad, firstIsOne, multiplier) {
    const messageLettersOnly = message.separate(alphabet);
    const messageIndexes = alphabet.findLetterIndexes(messageLettersOnly.toString());
    const padIndexes = alphabet.findLetterIndexes(pad.separate(alphabet).toString());
    const result = new Message();
    const bonus = firstIsOne ? multiplier : 0;

    for (let i = 0; i < messageIndexes.length; i += 1) {
        const fromChunk = message.charAt(i);
        const resultIndex = messageIndexes[i] + bonus + padIndexes[i % padIndexes.length] * multiplier;
        const toChunk = new MessageChunk(alphabet.toLetter(resultIndex), fromChunk.getPositions());
        result.append(toChunk);
    }

    return result;
}

module.exports = {
    /**
     * Deciphers a one time pad
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {OneTimePadOptions} options
     * @return {Message}
     */
    decipher(message, alphabet, options) {
        return otp(message, alphabet, options.pad, options.firstIsOne, -1);
    },


    /**
     * Enciphers a Bifid cipher.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {OneTimePadOptions} options
     * @return {Message}
     */
    encipher(message, alphabet, options) {
        return otp(message, alphabet, options.pad, options.firstIsOne, 1);
    }
};
