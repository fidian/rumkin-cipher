"use strict";

const helper = require("../helper-test")("columnarTransposition");

helper.both({
    description: "empty input",
    alphabet: "English",
    options: {
        columnKey: [3, 1, 2, 0]
    },
    plainText: "",
    cipherText: ""
});

helper.both({
    description: "Wristwatches",
    alphabet: "English",
    options: {
        columnKey: [3, 1, 4, 2, 0]
    },
    plainText: "Which wristwatches are Swiss wristwatches?",
    cipherText: "Hthes thhraswrascs crs Scwww eswweiitaiit?"
});

helper.both({
    description: "Moving capitalization",
    alphabet: "English",
    options: {
        columnKey: [1, 0],
        keepCapitalization: true
    },
    plainText: "Abcd",
    cipherText: "bdAc"
});
