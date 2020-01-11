"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractDocument = (function () {
    function AbstractDocument(input, length) {
        this._input = null;
        this._length = null;
        var name = this.constructor.name;
        if (name === "AbstractDocument") {
            throw new TypeError("Abstract class '" + name + "' cannot be instantiated on its own.");
        }
        var methodList = [
            ["format", null],
            ["validate", null]
        ];
        for (var n = 0; n < methodList.length; n++) {
            var _method = methodList[n];
            if (this[_method[0]] === undefined) {
                if (!_method[1])
                    _method[1] = "";
                throw new TypeError("Classes extending '" + name + "' must declare the '" + _method[0] + "(" + _method[1] + ")' method.");
            }
            this[_method[0]] = this[_method[0]].bind(this);
        }
        this._input = input;
        this._length = length;
    }
    Object.defineProperty(AbstractDocument.prototype, "input", {
        get: function () {
            return this._input;
        },
        set: function (value) {
            this._input = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractDocument.prototype, "length", {
        get: function () {
            return this._length;
        },
        set: function (value) {
            this._length = value;
        },
        enumerable: true,
        configurable: true
    });
    AbstractDocument.prototype.toJSON = function () {
        var isValid = (this.hasOwnProperty("validate"))
            ? this["validate"]() : false, formattedValue = (this.hasOwnProperty("format"))
            ? this["format"]() : "";
        return {
            value: this.input || "",
            formattedValue: formattedValue || "",
            isValid: isValid || false
        };
    };
    AbstractDocument.prototype.toString = function () {
        return "[object " + this.constructor.name + "]";
    };
    return AbstractDocument;
}());
exports.AbstractDocument = AbstractDocument;
