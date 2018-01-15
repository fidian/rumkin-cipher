"use strict";

/* eslint no-bitwise:off */
var letterCodes, Message;

Message = require("../util/message");
letterCodes = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

module.exports = {
    decode: (message) => {
        var chunkPositions, start, result;

        result = new Message();

        while (start < message.length) {
            // TODO
            start += 1;
        }

        return message;
    },

    /**
     * Encode a message into Base64. This assumes the message is made up of
     * single byte characters. If you have a string with accented characters,
     * then you might not know if you are dealing with an extended Latin
     * set or UTF-8 encoded messages.
     *
     * @param {Message} message
     * @return {Message}
     */
    encode: (message) => {
        var chunk, let1, let2, let3, let4, num1, num2, num3, result, start;

        result = new Message();
        start = 0;

        while (start < message.length) {
            chunk = message.substr(start, 3);

            if (chunk.value.length === 3) {
                num1 = chunk.value.charCodeAt(0);
                num2 = chunk.value.charCodeAt(1);
                num3 = chunk.value.charCodeAt(2);

                let1 = letterCodes.charAt(num1 >>> 2);
                let2 = letterCodes.charAt((num1 << 4 | num2 >>> 4) & 0x3F);
                let3 = letterCodes.charAt((num2 << 2 | num3 >>> 6) & 0x3F);
                let4 = letterCodes.charAt(num3 & 0x03F);
            } else if (chunk.value.length === 2) {
                num1 = chunk.value.charCodeAt(0);
                num2 = chunk.value.charCodeAt(1);

                let1 = letterCodes.charAt(num1 >>> 2);
                let2 = letterCodes.charAt((num1 << 4 | num2 >>> 4) & 0x3F);
                let3 = letterCodes.charAt(num2 << 2 & 0x3F);
                let4 = "=";
            } else {
                num1 = chunk.value.charCodeAt(0);

                let1 = letterCodes.charAt(num1 >>> 2);
                let2 = letterCodes.charAt(num1 << 4 & 0x3F);
                let3 = "=";
                let4 = "=";
            }

            chunk.value = let1 + let2 + let3 + let4;
            result.append(chunk);
            start += 3;
        }

        return result;
    }
};
