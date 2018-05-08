"use strict";

var colTrans, test;

colTrans = require("../../lib/cipher/columnar-transposition");
test = require("../module-test")(colTrans);

describe("columnar transposition", () => {
    test.both({
        alphabet: "English",
        description: "empty input",
        inText: "",
        options: {
            columnKey: [
                3,
                1,
                2,
                0
            ]
        },
        outText: ""
    });
    test.both({
        alphabet: "English",
        description: "Wristwatches",
        inText: "Hthes thhraswrascs crs Scwww eswweiitaiit?",
        options: {
            columnKey: [
                3,
                1,
                4,
                2,
                0
            ]
        },
        outText: "Which wristwatches are Swiss wristwatches?"
    });
});
