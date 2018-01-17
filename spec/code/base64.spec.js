"use strict";

var base64, test;

base64 = require("../../lib/code/base64");
test = require("../module-test")(base64);

describe("base64", () => {
    test.both({
        description: "wikipedia 1",
        inText: "YW55IGNhcm5hbCBwbGVhcw==",
        outText: "any carnal pleas"
    });
    test.both({
        description: "wikipedia 2",
        inText: "YW55IGNhcm5hbCBwbGVhc3U=",
        outText: "any carnal pleasu"
    });
    test.both({
        description: "wikipedia 3",
        inText: "YW55IGNhcm5hbCBwbGVhc3Vy",
        outText: "any carnal pleasur"
    });
    test.out({
        description: "decode ignores non-base64 characters",
        inText: "c 3#V*y)Z@S.4=",
        outText: "sure."
    });
    test.out({
        description: "does not require extra = at end",
        inText: "Lg",
        outText: "."
    });
});
