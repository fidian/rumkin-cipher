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
        alphabet: "English", // Z is dropped by default
        description: "Wikipedia example",
        inText: "Hadm ab yexo!", // "Hadn aa zdsp!" is if you map J -> I correctly
        outText: "Flee at once!"
    });
});
