"use strict";

var bifid, test;

bifid = require("../../lib/cipher/bifid");
test = require("../module-test")(bifid);

describe("bifid", () => {
    test.both({
        alphabet: "English",
        description: "empty input",
        inText: "",
        outText: ""
    });
    test.both({
        alphabet: "English",
        description: "Wikipedia example",
        inText: "Hadm ab yexo!",
        outText: "Flee at once!"
    });
});
