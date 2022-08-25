"use strict"

const helper = require("../helper-test")("oneTimePad");
const Message = require("../util/message");

helper.both({
    description: "Handling Ñ",
    alphabet: "Español",
    options: {
        pad: new Message("BBB")
    },
    plainText: "NÑO",
    cipherText: "ÑOP"
});

helper.both({
    description: "Wikipedia",
    alphabet: "English",
    options: {
        pad: new Message("XMCKL")
    },
    plainText: "HELLO",
    cipherText: "EQNVZ"
});
