"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractParser = (function () {
    function AbstractParser(input) {
        this._input = null;
        var name = this.constructor.name;
        if (name === "AbstractParser") {
            throw new TypeError("Abstract class '" + name + "' cannot be instantiated on its own.");
        }
        this._input = input;
    }
    Object.defineProperty(AbstractParser.prototype, "input", {
        get: function () {
            return this._input;
        },
        set: function (value) {
            this._input = value;
        },
        enumerable: true,
        configurable: true
    });
    AbstractParser.prototype.toString = function () {
        return "[object " + this.constructor.name + "]";
    };
    return AbstractParser;
}());
exports.AbstractParser = AbstractParser;
