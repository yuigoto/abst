"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractStore = (function () {
    function AbstractStore() {
        var name = this.constructor.name;
        if (name === "AbstractStore") {
            throw new TypeError("Abstract class '" + name + "' cannot be instantiated on its own.");
        }
        var methodList = [
            ["get", "key"],
            ["getAll", null],
            ["set", "key, value"],
            ["remove", "key"],
            ["clear", null]
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
    }
    AbstractStore.prototype.toString = function () {
        return "[object " + this.constructor.name + "]";
    };
    return AbstractStore;
}());
exports.AbstractStore = AbstractStore;
