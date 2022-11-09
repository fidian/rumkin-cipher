"use strict";

module.exports = function upper(s) {
    return s.replace(/ß/g, 'ẞ').toUpperCase();
};
