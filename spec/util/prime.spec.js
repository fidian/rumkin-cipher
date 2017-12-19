"use strict";

var prime;

prime = require("../../lib/util/prime");

describe("prime", () => {
    it("considers 0 not prime", () => {
        expect(prime(0)).toBe(false);
    });
    it("considers 1 not prime", () => {
        expect(prime(1)).toBe(false);
    });
    it("considers 2 prime", () => {
        expect(prime(2)).toBe(true);
    });
    it("considers 97 prime", () => {
        expect(prime(97)).toBe(true);
    });
    it("considers 6 not prime", () => {
        expect(prime(6)).toBe(false);
    });
    it("considers 8 not prime", () => {
        expect(prime(8)).toBe(false);
    });
    it("considers 12347 prime", () => {
        expect(prime(12347)).toBe(true);
    });
    it("returns an array of primes", () => {
        expect(prime()).toEqual(jasmine.any(Array));
    });
});
