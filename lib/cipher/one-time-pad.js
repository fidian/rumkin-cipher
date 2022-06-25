"use strict";

var Message, MessageChunk;

Message = require("../util/message");
MessageChunk = require("../util/message-chunk");

/**
 * @typedef {Object} OneTimePadOptions
 * @param {Message} pad
 */

/**
 * Enciphers and deciphers a one-time pad
 *
 * @param {Message} message
 * @param {Alphabet} alphabet
 * @param {Message} pad
 * @param {number} multiplier
 * @return {Message}
 */
function otp(message, alphabet, pad, multiplier) {
    var fromChunk, i, messageIndexes, messageLettersOnly, padIndexes, result, resultIndex, toChunk;

    messageLettersOnly = message.separate(alphabet);
    messageIndexes = alphabet.findLetterIndexes(messageLettersOnly.toString());
    padIndexes = alphabet.findLetterIndexes(pad.separate(alphabet).toString());
    result = new Message();

    for (i = 0; i < messageIndexes.length; i += 1) {
        fromChunk = message.charAt(i);
        resultIndex = messageIndexes[i] + padIndexes[i % padIndexes.length];
        resultIndex *= multiplier;
        toChunk = new MessageChunk(alphabet.toLetter(resultIndex), fromChunk.getPositions());
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
        return otp(message, alphabet, options.pad, -1);
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
        return otp(message, alphabet, options.pad, 1);
    }
};
