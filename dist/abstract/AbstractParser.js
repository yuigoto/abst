"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractParser = (function () {
    function AbstractParser(input) {
        this._input = null;
        var name = this.constructor.name;
        if (name === "AbstractParser") {
            throw new TypeError("Abstract class '" + name + "' cannot be instantiated on its own.");
        }
        var methodList = [
            ["parse", null]
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
