"use strict";

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

helper.both({
    description: "firstIsOne = false",
    alphabet: "English",
    options: {
        firstIsOne: false,
        pad: new Message("ABCD")
    },
    plainText: "MM M-M",
    cipherText: "MN O-P"
});

helper.both({
    description: "firstIsOne = true",
    alphabet: "English",
    options: {
        firstIsOne: true,
        pad: new Message("AB")
    },
    plainText: "MM",
    cipherText: "NO"
});
