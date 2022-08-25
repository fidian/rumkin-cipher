"use strict";

const Message = require("../util/message");

/**
 * @typedef {Object} RailFenceOptions
 * @param {number} [offset=0] Must be from 0 to ((rails - 1) * 2) - 1. So, rails 5, max offset is 7.
 * @param {number} [rails=5] Number of rails, greater than 0. Encryption happens with rails greater than 1.
 */

/**
 * Returns the maximum offset for a number of rails.
 *
 * @param {number} rails
 * @return {number}
 */
function maximumOffset(rails) {
    return (rails - 1) * 2 - 1;
}

/**
 * Standardize the options for enciphering and deciphering.
 *
 * @param {?RailfenceOptions} options
 * @return {RailfenceOptions}
 */
function standardizeCipherOptions(options) {
    if (!options) {
        options = {};
    }

    if (!options.rails || options.rails < 0) {
        options.rails = 5;
    }

    if (!options.offset || options.offset < 0) {
        options.offset = 0;
    }

    const max = maximumOffset(options.rails);

    if (options.offset > max) {
        options.offset = max;
    }

    return options;
}

module.exports = {
    /**
     * Deciphers a rail fence cipher.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {RailFenceOptions} options
     * @return {Message}
     */
    decipher(message, alphabet, options) {
        const separated = message.separate(alphabet);
        options = standardizeCipherOptions(options);
        const rails = [];

        while (rails.length < options.rails) {
            rails.push([]);
        }

        let position = options.offset;
        const maxPosition = maximumOffset(options.rails);
        const railDirectionSeparation = options.rails - 1;

        for (let i = 0; i < separated.value.length; i += 1) {
            const rail =
                position < railDirectionSeparation
                    ? position
                    : options.rails - position + railDirectionSeparation - 1;
            rails[rail].push(i);
            position += 1;

            if (position > maxPosition) {
                position = 0;
            }
        }

        const resultShuffled = [];
        let separatedIndex = 0;

        for (const rail of rails) {
            for (const index of rail) {
                resultShuffled.push({
                    index,
                    chunk: separated.charAt(separatedIndex)
                });
                separatedIndex += 1;
            }
        }

        resultShuffled.sort((a, b) => {
            return a.index - b.index;
        });
        const result = new Message();

        for (const entry of resultShuffled) {
            result.append(entry.chunk);
        }

        return message.overlay(alphabet, result);
    },

    /**
     * Enciphers a rail fence cipher.
     *
     * @param {Message} message
     * @param {Alphabet} alphabet
     * @param {RailFenceOptions} options
     * @return {Message}
     */
    encipher(message, alphabet, options) {
        const separated = message.separate(alphabet);
        options = standardizeCipherOptions(options);
        const rails = [];

        while (rails.length < options.rails) {
            rails.push(new Message());
        }

        let position = options.offset;
        const maxPosition = maximumOffset(options.rails);
        const railDirectionSeparation = options.rails - 1;

        for (let i = 0; i < separated.value.length; i += 1) {
            const rail =
                position < railDirectionSeparation
                    ? position
                    : options.rails - position + railDirectionSeparation - 1;
            rails[rail].append(separated.charAt(i));
            position += 1;

            if (position > maxPosition) {
                position = 0;
            }
        }

        const result = new Message();

        for (const rail of rails) {
            result.append(rail);
        }

        return message.overlay(alphabet, result);
    }
};
