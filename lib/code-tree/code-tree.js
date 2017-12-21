"use strict";

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
     * Seeks out a code. Returns `null` when it can not find a code mapping.
     * When it can find a code mapping it returns an object with some
     * properties indicating what the current value is and if there are
     * longer codes available.
     *
     * @param {string} from
     * @return {Object?}
     */
    get(from) {
        var c, i, node;

        node = this.root;

        for (i = 0; i < from.length; i += 1) {
            c = from.charAt(i);

            if (!node[c]) {
                return null;
            }

            node = node[c];
        }

        return {
            hasChild: node.hasChild,
            value: node.value
        };
    }
};
