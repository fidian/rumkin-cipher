"use strict";

/**
 * Base class for messages for simplifying type checks.
 */
class Message {}

Message.isMessage = (thing) => {
    if (thing instanceof Message) {
        return true;
    }

    // Strings can be messages too.
    if (typeof thing === "string") {
        return true;
    }

    return false;
};

module.exports = Message;
