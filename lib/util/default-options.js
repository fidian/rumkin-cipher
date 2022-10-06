"use strict";

/**
 * @param {any} value
 * @param {Object} def
 * @return {boolean}
 */
function defaultArray(value, def) {
    if (!Array.isArray(value)) {
        return [];
    }

    const result = [];

    for (const item of value) {
        result.push(defaultByType(item, def.item));
    }

    return result;
}

/**
 * @param {any} value
 * @return {boolean}
 */
function defaultBoolean(value) {
    return !!value;
}

/**
 * @param {any} value
 * @param {Object} def
 * @return {number}
 */
function defaultNumber(value, def) {
    if (typeof value !== "number" || isNaN(value)) {
        return def.default || 0;
    }

    return value;
}

/**
 * @param {any} value
 * @param {Object} def
 * @return {number}
 */
function defaultString(value, def) {
    if (!value || typeof value !== "string") {
        return def.default || "";
    }

    return value;
}

/**
 * @param {any} value
 * @param {Object} def
 * @return {any}
 */
function defaultByType(value, def) {
    switch (def.type) {
        case "array":
            return defaultArray(value, def);

        case "boolean":
            return defaultBoolean(value, def);

        case "number":
            return defaultNumber(value, def);

        case "integer":
            return ~~defaultNumber(value, def);

        case "string":
            return defaultString(value, def);

        default:
            throw new Error("Invalid options definition");
    }
}

/**
 * @param {any} data The incoming options
 * @param {Object} definitions A schema of sorts
 * @return {Object} Contains defaulted values
 */
module.exports = function options(data, definitions) {
    const result = {};

    if (!data || typeof data !== "object") {
        data = {};
    }

    for (const [prop, def] of Object.entries(definitions)) {
        result[prop] = defaultByType(data[prop], def);
    }

    return result;
};
