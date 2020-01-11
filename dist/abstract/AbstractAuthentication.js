"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractAuthentication = (function () {
    function AbstractAuthentication() {
        var name = this.constructor.name;
        if (name === "AbstractParser") {
            throw new TypeError("Abstract class '" + name + "' cannot be instantiated on its own.");
        }
    }
    AbstractAuthentication.prototype.toString = function () {
        return "[object " + this.constructor.name + "]";
    };
    return AbstractAuthentication;
}());
exports.AbstractAuthentication = AbstractAuthentication;
