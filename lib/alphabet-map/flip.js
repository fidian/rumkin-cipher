"use strict";

module.exports = (map) => {
    var i, keys, result;

    result = {};
    keys = Object.keys(map);

    for (i = 0; i < keys.length; i += 1) {
        result[map[keys[i]]] = keys[i];
    }

    return result;
};
