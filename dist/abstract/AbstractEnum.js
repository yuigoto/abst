"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractSingleton_1 = require("../abstract/AbstractSingleton");
var AbstractEnum = (function (_super) {
    __extends(AbstractEnum, _super);
    function AbstractEnum(enumerator) {
        var _this = _super.call(this) || this;
        var name = _this.constructor.name;
        if (name === "AbstractEnum") {
            throw new TypeError("Abstract class '" + name + "' cannot be instantiated on its own.");
        }
        var selfKeys = Object.keys(_this), selfVals = Object.keys(_this).map(function (key) { return _this[key]; }), enumKeys = Object.keys(enumerator);
        if (selfKeys.length === 0) {
            for (var _i = 0, enumKeys_1 = enumKeys; _i < enumKeys_1.length; _i++) {
                var key = enumKeys_1[_i];
                try {
                    if (selfKeys.indexOf(key) > -1
                        || selfVals.indexOf(enumerator[key]) > -1) {
                        throw new TypeError("Enumerator keys and values must be distinct.");
                    }
                    _this[key] = enumerator[key];
                    selfKeys = Object.keys(_this);
                    selfVals = Object.keys(_this).map(function (key) { return _this[key]; });
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
        return _this;
    }
    AbstractEnum.prototype.get = function (value) {
        var _this = this;
        if (!this.isValidValue(value))
            return "UNKNOWN";
        return this.getKeys().find(function (key) { return _this[key] === value; });
    };
    AbstractEnum.prototype.getKeys = function () {
        return Object.keys(this);
    };
    AbstractEnum.prototype.getValues = function () {
        var _this = this;
        return Object.keys(this).map(function (key) { return _this[key]; });
    };
    AbstractEnum.prototype.toJSON = function () {
        var returnable = {}, keys = Object.keys(this);
        for (var k = 0; k < keys.length; k++) {
            if (this[keys[k]] !== undefined) {
                returnable[keys[k]] = this[keys[k]];
            }
        }
        return returnable;
    };
    AbstractEnum.prototype.toString = function () {
        return "[object " + this.constructor.name + "]";
    };
    AbstractEnum.prototype.isValidValue = function (value) {
        return (this.getValues().indexOf(value) > -1);
    };
    return AbstractEnum;
}(AbstractSingleton_1.AbstractSingleton));
exports.AbstractEnum = AbstractEnum;
