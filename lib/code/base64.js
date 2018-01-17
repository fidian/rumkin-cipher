"use strict";

/* eslint no-bitwise:off */
var letterCodes, Message;

Message = require("../util/message");
letterCodes = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

module.exports = {
    decode: (message) => {
        var chunk, chunkValue, index1, index2, index3, index4, num1, num2, num3, result, start;

        message = message.filter(/[+A-Za-z0-9/]/);
        result = new Message();

        for (start = 0; start < message.length; start += 4) {
            chunk = message.substr(start, 4);
            chunkValue = chunk.getValue();

            if (chunkValue.length === 4) {
                index1 = letterCodes.indexOf(chunkValue.charAt(0));
                index2 = letterCodes.indexOf(chunkValue.charAt(1));
                index3 = letterCodes.indexOf(chunkValue.charAt(2));
                index4 = letterCodes.indexOf(chunkValue.charAt(3));

                num1 = (index1 << 2 | index2 >>> 4) & 0xFF;
                num2 = (index2 << 4 | index3 >>> 2) & 0xFF;
                num3 = (index3 << 6 | index4) & 0xFF;

                chunk.setValue(String.fromCharCode(num1) + String.fromCharCode(num2) + String.fromCharCode(num3));
            } else if (chunkValue.length === 3) {
                index1 = letterCodes.indexOf(chunkValue.charAt(0));
                index2 = letterCodes.indexOf(chunkValue.charAt(1));
                index3 = letterCodes.indexOf(chunkValue.charAt(2));

                num1 = (index1 << 2 | index2 >>> 4) & 0xFF;
                num2 = (index2 << 4 | index3 >>> 2) & 0xFF;

                chunk.setValue(String.fromCharCode(num1) + String.fromCharCode(num2));
            } else if (chunkValue.length === 2) {
                index1 = letterCodes.indexOf(chunkValue.charAt(0));
                index2 = letterCodes.indexOf(chunkValue.charAt(1));

                num1 = (index1 << 2 | index2 >>> 4) & 0xFF;

                chunk.setValue(String.fromCharCode(num1));
            } else {
                // A single Base64 character is not valid.
                chunk.setValue("");
            }

            result.append(chunk);
        }

        return result;
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
        var chunk, chunkValue, let1, let2, let3, let4, num1, num2, num3, result, start;

        result = new Message();
        start = 0;

        while (start < message.length) {
            chunk = message.substr(start, 3);
            chunkValue = chunk.getValue();

            if (chunkValue.length === 3) {
                num1 = chunkValue.charCodeAt(0);
                num2 = chunkValue.charCodeAt(1);
                num3 = chunkValue.charCodeAt(2);

                let1 = letterCodes.charAt(num1 >>> 2);
                let2 = letterCodes.charAt((num1 << 4 | num2 >>> 4) & 0x3F);
                let3 = letterCodes.charAt((num2 << 2 | num3 >>> 6) & 0x3F);
                let4 = letterCodes.charAt(num3 & 0x03F);
            } else if (chunkValue.length === 2) {
                num1 = chunkValue.charCodeAt(0);
                num2 = chunkValue.charCodeAt(1);

                let1 = letterCodes.charAt(num1 >>> 2);
                let2 = letterCodes.charAt((num1 << 4 | num2 >>> 4) & 0x3F);
                let3 = letterCodes.charAt(num2 << 2 & 0x3F);
                let4 = "=";
            } else {
                num1 = chunkValue.charCodeAt(0);

                let1 = letterCodes.charAt(num1 >>> 2);
                let2 = letterCodes.charAt(num1 << 4 & 0x3F);
                let3 = "=";
                let4 = "=";
            }

            chunk.setValue(let1 + let2 + let3 + let4);
            result.append(chunk);
            start += 3;
        }

        return result;
    }
};
