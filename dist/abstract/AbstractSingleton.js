"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractSingleton = (function () {
    function AbstractSingleton() {
        var name = this.constructor.name;
        if (name === "AbstractSingleton") {
            throw new TypeError("Abstract class '" + name + "' cannot be instantiated on its own.");
        }
        if (this.constructor._instance) {
            return this.constructor._instance;
        }
        this.constructor._instance = this;
    }
    AbstractSingleton.prototype.toString = function () {
        return "[object " + this.constructor.name + "]";
    };
    return AbstractSingleton;
}());
exports.AbstractSingleton = AbstractSingleton;
