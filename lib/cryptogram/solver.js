"use strict";

/**
 * @typedef {Object} SolverOptions
 * @property {boolean} homophonic True if multiple ciphertext letters
 *     may map to a single plaintext letter
 */

/**
 * @typedef {Object} EliminationState
 * @property {SolverOptions} options
 * @property {number} wordIndex The "active" word index
 * @property {Array.<EliminationWordState>} wordState
 */

/**
 * @typedef {Object} EliminationWordState
 * @property {Word} word
 * @property {number} length
 * @property {Set.<string>} validSolutions
 * @property {Map.<string,string>} incomingLetterMap
 * @property {Set.<string>} incomingPlaintextSet
 * @property {number} index The "active" word
 */

/**
 * @typedef {function} StatusCallback
 * @param {number} progress A number from 0 to 1 indicating how
 *     far we've progressed through the entire search space of
 *     all possibilites. Note: this won't be good for a time
 *     estimate because many branches are pruned quickly
 *     instead of exploring everything.
 * @param {Array.<WordStatus>} Words being evaluated
 */

/**
 * @typedef {Object} WordStatus
 * @property {string} word
 * @property {number} index This is word X ...
 * @property {number} length ... out of Y total words
 */

const defaultOptions = require("../util/default-options");

module.exports = class Solver {
    /**
     * Calls the progress callback
     *
     * @param {StatusCallback} statusCallback
     * @param {EliminationState} state
     */
    callProgressCallback(statusCallback, state) {
        let done = 0; // How far done
        let nextTotal = 1; // How big of a pie we're slicing
        const wordsBeingEvaluated = [];

        for (let i = 0; i < state.wordIndex; i += 1) {
            const wordState = state.wordState[i];

            // Cut the pie into slices
            nextTotal /= wordState.length;

            // Serve the completed slices
            done += nextTotal * wordState.index;

            // Add the word
            wordsBeingEvaluated.push({
                word: wordState.word.availableWords[wordState.index],
                index: wordState.index,
                length: wordState.length
            });
        }

        statusCallback(done, wordsBeingEvaluated);
    }

    /**
     * Eliminate words from copy's availableWords.
     *
     * @param {EliminationState} state
     */
    commitEliminationState(state) {
        for (const wordState of state.wordState) {
            wordState.word.availableWords =
                wordState.word.availableWords.filter((w) =>
                    wordState.validSolutions.has(w)
                );
        }
    }

    /**
     * Eliminate bad combinations, which are entries that can
     * not be used to map to a solution that's found using only
     * wordlist words.
     *
     * @param {Array.<Word|NonWord>} items
     * @param {StatusCallback} [options]
     * @param {StatusCallback} [statusCallback]
     * @return {Promise.<Array.<Word|NonWord>>} Modified clone
     *     of items
     */
    eliminateBadCombinations(items, options, statusCallback) {
        if (!statusCallback && typeof options === "function") {
            statusCallback = options;
            options = {};
        }

        options = defaultOptions(options, {
            homophonic: {
                type: "boolean"
            }
        });

        const copy = items.map((item) => item.clone());
        const words = copy.filter((item) => item.isWord());
        words.sort((a, b) => this.sortWordsForSolving(a, b));

        const state = {
            options,
            wordState: words.map((word) => {
                return {
                    word,
                    length: word.availableWords.length,
                    validSolutions: new Set(),
                    incomingLetterMap: new Map(),
                    incomingPlaintextSet: new Set(),
                    index: 0
                };
            }),
            wordIndex: 0
        };

        return new Promise((resolve) => {
            const runNext = () => {
                if (this.processEliminationState(state)) {
                    this.commitEliminationState(state);
                    resolve(copy);

                    return;
                }

                if (statusCallback) {
                    this.callProgressCallback(statusCallback, state);
                }

                setTimeout(() => runNext(), 1);
            };

            runNext();
        });
    }

    /**
     * Iterates through a state doing what it can until time
     * expires or we finish finding options.
     *
     * @param {EliminationState} state
     * @return {boolean} true when done
     */
    processEliminationState(state) {
        const startTime = Date.now();

        // Run for 100 ms or until out of options
        while (Date.now() < startTime + 1) {
            const wordState = state.wordState[state.wordIndex];

            if (
                this.wordWorksForMap(
                    state.options,
                    wordState
                )
            ) {
                // Go deeper. This sets the index to 0 on the next word
                // or increments the current word's index.
                this.processMatch(state);
            } else {
                // Proceed to next word.
                state.wordState[state.wordIndex].index += 1;
            }

            if (this.moveToNextOption(state)) {
                return true;
            }
        }

        // Not done
        return false;
    }

    /**
     * The word matches, so go deeper. If we are as deep as we
     * can get, then mark all words as being a potential
     * solution.
     *
     * @param {EliminationState} state
     */
    processMatch(state) {
        const prevWordState = state.wordState[state.wordIndex];
        state.wordIndex += 1;
        const nextWordState = state.wordState[state.wordIndex];

        if (nextWordState) {
            // Reset index on the next word
            nextWordState.index = 0;
            this.updateWordStateFromPrevious(
                state.options,
                prevWordState,
                nextWordState
            );
        } else {
            // Ran out of words, so move back to the last word in the
            // list
            state.wordIndex -= 1;

            for (const wordState of state.wordState) {
                wordState.validSolutions.add(
                    wordState.word.availableWords[wordState.index]
                );
            }

            // Increment the index because we're done with this word.
            prevWordState.index += 1;

            return;
        }
    }

    /**
     * Go to the next word. If no next word, move up. If
     * nothing higher, we're done.
     *
     * @param {EliminationState} state
     * @return {boolean}
     */
    moveToNextOption(state) {
        // Are we done with this list? Need to evaluate the
        // word index each time because we loop
        while (
            state.wordState[state.wordIndex].index >=
            state.wordState[state.wordIndex].length
        ) {
            // GO UP
            state.wordIndex -= 1;

            if (state.wordIndex < 0) {
                // Ran out of options, so we're done
                return true;
            }

            state.wordState[state.wordIndex].index += 1;
        }

        return false;
    }

    /**
     * Sort function comparing two words to see which one
     * should be tackled first.
     *
     * @param {Word} a
     * @param {Word} b
     * @return {number}
     */
    sortWordsForSolving(a, b) {
        // Sort first by the words with the most unique
        // characters
        const distinctCount = b.pattern.distinctCount - a.pattern.distinctCount;

        if (distinctCount) {
            return distinctCount;
        }

        // Next, try to pick one that has fewer available words
        const availableWords =
            a.availableWords.length - b.availableWords.length;

        if (availableWords) {
            return availableWords;
        }

        // Finally, use the longer word
        return b.chars.length - a.chars.length;
    }

    /**
     * Augment existing map data with information from the next matching
     * word.
     *
     * @param {SolverOptions} options
     * @param {EliminationWordState} prevWordState
     * @param {EliminationWordState} nextWordState
     */
    updateWordStateFromPrevious(options, prevWordState, nextWordState) {
        const map = new Map(prevWordState.incomingLetterMap);
        const set = new Set(prevWordState.incomingPlaintextSet);
        const chars = prevWordState.word.chars;
        const word = prevWordState.word.availableWords[prevWordState.index];

        for (let i = 0; i < chars.length; i += 1) {
            map.set(chars.charAt(i), word.charAt(i));
            set.add(word.charAt(i));
        }

        nextWordState.incomingLetterMap = map;
        nextWordState.incomingPlaintextSet = set;
    }

    /**
     * Returns true if this word matches the current letters in
     * the map. Also check if the homophonic
     *
     * @param {SolverOptions} options
     * @param {EliminationWordState} wordState
     * @return {boolean}
     */
    wordWorksForMap(options, wordState) {
        const chars = wordState.word.chars;
        const word = wordState.word.availableWords[wordState.index];
        const map = wordState.incomingLetterMap;
        const set = wordState.incomingPlaintextSet;

        for (let i = 0; i < chars.length; i += 1) {
            const from = chars.charAt(i);
            const to = word.charAt(i);
            const mapped = map.get(from);

            // FIXME add check if !options.homophonic

            if (mapped) {
                if (mapped !== to) {
                    return false;
                }
            } else {
                if (!options.homophonic && set.has(to)) {
                    return false;
                }
            }
        }

        return true;
    }
};
