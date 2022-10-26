"use strict";

/**
 * @typedef {Array.<CodeTreeDataEntry>} CodeTreeData
 */

/**
 * @typedef {Object} CodeTreeDataEntry
 * @property {string} code
 * @property {Array.<string>} text
 */

module.exports = class CodeTree {
    /**
     * Build a new code tree for message encoding/decoding.
     */
    constructor() {
        this.root = {};
    }


    /**
     * Add a new translation.
     *
     * @param {string} from
     * @param {string} to
     * @return {this}
     */
    add(from, to) {
        var c, i, node;

        node = this.root;

        for (i = 0; i < from.length; i += 1) {
            c = from.charAt(i);

            if (!node[c]) {
                node[c] = {};
            }

            node.hasChild = true;
            node = node[c];
        }

        node.value = to;

        return this;
    }


    /**
     * Adds several translations at once.
     *
     * @param {Object} obj Hash, key is "from", value is "to".
     * @return {this}
     */
    addObject(obj) {
        var i, keys;

        keys = Object.keys(obj);

        for (i = 0; i < keys.length; i += 1) {
            this.add(keys[i], obj[keys[i]]);
        }

        return this;
    }

    /**
     * Convert code tree data to a decoding code tree.
     *
     * @param {CodeTreeData} data
     * @return {this}
     */
    fromDataToDecodeTree(data) {
        for (const item of data) {
            // Only add the first text possibility
            this.add(item.code, item.text[0]);
        }

        return this;
    }

    /**
     * Convert code tree data to an encoding code tree.
     *
     * @param {CodeTreeData} data
     * @return {this}
     */
    fromDataToEncodeTree(data) {
        for (const item of data) {
            for (const t of item.text) {
                this.add(t, item.code);
            }
        }

        return this;
    }


    /**
     * Seeks out a code. Returns `null` when it can not find a code mapping.
     * When it can find a code mapping it returns an object with some
     * properties indicating what the current value is and if there are
     * longer codes available.
     *
     * @param {string} from
     * @return {Object?}
     */
    get(from) {
        let node = this.root;

        for (let i = 0; i < from.length; i += 1) {
            const c = from.charAt(i);

            if (!node[c]) {
                return null;
            }

            node = node[c];
        }

        // Remove undefined values
        const result = {
            length: from.length
        };

        if (node.hasChild) {
            result.hasChild = node.hasChild;
        }

        if (node.value) {
            result.value = node.value;
        }

        return result;
    }
};
