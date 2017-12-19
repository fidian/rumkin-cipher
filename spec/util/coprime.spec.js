"use strict";

var coprime;

coprime = require("../../lib/util/coprime");

describe("coprime", () => {
    it("returns true when passed negative numbers", () => {
        expect(coprime(10, -1)).toBe(true);
    });
    it("returns true when passed 1", () => {
        expect(coprime(10, 1)).toBe(true);
    });
    it("returns false with a composite and a prime in the composite's factor list", () => {
        expect(coprime(10, 2)).toBe(false);
    });
    it("returns false when both share 3 as a factor", () => {
        expect(coprime(6, 9)).toBe(false);
    });
    it("works with two primes", () => {
        expect(coprime(7, 97)).toBe(true);
    });
    it("works with two coprime numbers", () => {
        expect(coprime(26, 15)).toBe(true);
    });
});
