"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractValidation = (function () {
    function AbstractValidation(input) {
        this._input = null;
        var name = this.constructor.name;
        if (name === "AbstractValidation") {
            throw new TypeError("Abstract class '" + name + "' cannot be instantiated on its own.");
        }
        this._input = input;
    }
    Object.defineProperty(AbstractValidation.prototype, "input", {
        get: function () {
            return this._input;
        },
        set: function (value) {
            this._input = value;
        },
        enumerable: true,
        configurable: true
    });
    AbstractValidation.prototype.toJSON = function () {
        var validation = (this.hasOwnProperty("validate"))
            ? this["validate"]() : false, message = (this.hasOwnProperty("message"))
            ? this["message"]() : "";
        return {
            value: this.input || "",
            message: message || "",
            validation: validation || false
        };
    };
    AbstractValidation.prototype.toString = function () {
        return "[object " + this.constructor.name + "]";
    };
    return AbstractValidation;
}());
exports.AbstractValidation = AbstractValidation;
