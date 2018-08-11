"use strict";

var CodeTree;

CodeTree = require("../../lib/code-tree/code-tree.js");

describe("CodeTree", () => {
    var codeTree;

    beforeEach(() => {
        codeTree = new CodeTree();
    });
    it("lets you retrieve a partial result", () => {
        codeTree.add("in", "out");
        expect(codeTree.get("i")).toEqual({
            hasChild: true
        });
    });
    it("lets you add items", () => {
        codeTree.add("in", "out");
        expect(codeTree.get("in")).toEqual({
            value: "out"
        });
    });
    it("allows you to add multiple values at once", () => {
        codeTree.addObject({
            one: "111",
            two: "22",
            three: "3"
        });
        expect(codeTree.get("one")).toEqual({
            value: "111"
        });
        expect(codeTree.get("two")).toEqual({
            value: "22"
        });
        expect(codeTree.get("three")).toEqual({
            value: "3"
        });
    });
});
