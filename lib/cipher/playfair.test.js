"use strict";

const helper = require("../helper-test")("playfair");

helper.both({
    description: "empty string",
    alphabet: "English",
    plainText: "",
    cipherText: ""
});

// English will have Z dropped by default.
//
// A B C D E
// F G H I J
// K L M N O
// P Q R S T
// U V W X Y

helper.both({
    description: "Easy",
    alphabet: "English",
    plainText: "Easy",
    cipherText: "Abtx"
});

helper.encipher({
    description: "Really hard",
    alphabet: "English",
    // doubled letters + doubled pad letters + "q" + vertical wrap + horizontal
    // wrap + odd number when done
    plainText: "AAXXXYAUAEM",
    // Intermediate and paired up with letters. Lowercase letters were inserted automatically.
    //           AxAXXyXYAUAEMx
    cipherText: "DUDUYUYUFABANW"
});

helper.decipher({
    description: "Really hard (backwards)",
    alphabet: "English",
    plainText: "axaxxyxyauaemx",
    cipherText: "duduyuyufabanw"
});

helper.both({
    description: "doubles down and right",
    alphabet: "English",
    options: {
        doubles: "DOWN_RIGHT"
    },
    plainText: "MM",
    cipherText: "SS"
});

helper.both({
    description: "doubles left as-is",
    alphabet: "English",
    options: {
        doubles: "UNCHANGED"
    },
    plainText: "MM",
    cipherText: "MM"
});

helper.encipher({
    description: "replace double with pad",
    alphabet: "English",
    options: {
        doubles: "REPLACE"
    },
    plainText: "MMXX",
    cipherText: "NWYU"
});
