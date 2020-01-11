"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractStore = (function () {
    function AbstractStore() {
        var name = this.constructor.name;
        if (name === "AbstractStore") {
            throw new TypeError("Abstract class '" + name + "' cannot be instantiated on its own.");
        }
    }
    AbstractStore.prototype.toString = function () {
        return "[object " + this.constructor.name + "]";
    };
    return AbstractStore;
}());
exports.AbstractStore = AbstractStore;
