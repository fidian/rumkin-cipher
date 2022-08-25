"use strict";

const helper = require("../helper-test")("base64");

helper.both({
    description: "wikipedia 1",
    plainText: "any carnal pleas",
    cipherText: "YW55IGNhcm5hbCBwbGVhcw=="
});

helper.both({
    description: "wikipedia 2",
    plainText: "any carnal pleasu",
    cipherText: "YW55IGNhcm5hbCBwbGVhc3U="
});

helper.both({
    description: "wikipedia 3",
    plainText: "any carnal pleasur",
    cipherText: "YW55IGNhcm5hbCBwbGVhc3Vy"
});

helper.decipher({
    description: "decode ignores non-base64 characters",
    plainText: "sure.",
    cipherText: "c 3#V*y)Z@S.4="
});

helper.decipher({
    description: "does not require extra = at end",
    plainText: ".",
    cipherText: "Lg"
});
