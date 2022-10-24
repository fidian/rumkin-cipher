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
    alphabet: "English", // Z is dropped by default
    plainText: "Easy",
    cipherText: "Abtx"
});

helper.encipher({
    description: "Really hard",
    alphabet: "English", // Z is dropped by default
    // doubled letters + doubled pad letters + "q" + vertical wrap + horizontal
    // wrap + odd number when done
    plainText: "AAXXXYAUAEM",
    // Intermediate and paired up with letters. Lowercase letters were inserted automatically.
    //           AxAXXyXYAUAEMx
    cipherText: "DUDUYUYUFABANW"
});

helper.decipher({
    description: "Really hard (backwards)",
    alphabet: "English", // Z is dropped by default
    plainText: "axaxxyxyauaemx",
    cipherText: "duduyuyufabanw"
});
