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
var AbstractSingleton_1 = require("abstract/AbstractSingleton");
var AbstractList = (function (_super) {
    __extends(AbstractList, _super);
    function AbstractList(listObject) {
        var _this = _super.call(this) || this;
        var name = _this.constructor.name;
        if (name === "AbstractList") {
            throw new TypeError("Abstract class '" + name + "' cannot be instantiated on its own.");
        }
        var selfKeys = Object.keys(_this), selfVals = Object.keys(_this).map(function (key) { return _this[key]; }), listKeys = Object.keys(listObject);
        if (selfKeys.length === 0) {
            var _loop_1 = function (key) {
                try {
                    var curr_1 = listObject[key], exists = selfVals.filter(function (item) {
                        return (item.id === curr_1.id
                            || item.name === curr_1.name
                            || item.slug === curr_1.slug);
                    });
                    if (!curr_1.hasOwnProperty("id")
                        || !curr_1.hasOwnProperty("name")
                        || !curr_1.hasOwnProperty("slug")) {
                        throw new TypeError("'" + name + "' items must have an 'id', 'name' and 'slug' properties.");
                    }
                    else {
                    }
                    if (selfKeys.indexOf(key) > -1
                        || exists.length > 0) {
                        throw new TypeError("'" + name + "' items must have distinct keys and values.");
                    }
                    this_1[key] = curr_1;
                    selfKeys = Object.keys(this_1);
                    selfVals = Object.keys(this_1).map(function (key) { return _this[key]; });
                }
                catch (e) {
                    console.error(e);
                }
            };
            var this_1 = this;
            for (var _i = 0, listKeys_1 = listKeys; _i < listKeys_1.length; _i++) {
                var key = listKeys_1[_i];
                _loop_1(key);
            }
        }
        return _this;
    }
    AbstractList.prototype.getIdByKey = function (value) {
        return this._getBy("id", "key", value);
    };
    AbstractList.prototype.getIdByName = function (value) {
        return this._getBy("id", "name", value);
    };
    AbstractList.prototype.getIdBySlug = function (value) {
        return this._getBy("id", "slug", value);
    };
    AbstractList.prototype.getNameById = function (value) {
        return this._getBy("name", "id", value);
    };
    AbstractList.prototype.getNameBySlug = function (value) {
        return this._getBy("name", "slug", value);
    };
    AbstractList.prototype.getNameByKey = function (value) {
        return this._getBy("name", "key", value);
    };
    AbstractList.prototype.getSlugById = function (value) {
        return this._getBy("slug", "id", value);
    };
    AbstractList.prototype.getSlugByName = function (value) {
        return this._getBy("slug", "name", value);
    };
    AbstractList.prototype.getSlugByKey = function (value) {
        return this._getBy("slug", "key", value);
    };
    AbstractList.prototype.getKeyById = function (value) {
        return this._getBy("key", "id", value);
    };
    AbstractList.prototype.getKeyByName = function (value) {
        return this._getBy("key", "name", value);
    };
    AbstractList.prototype.getKeyBySlug = function (value) {
        return this._getBy("key", "slug", value);
    };
    AbstractList.prototype.getObjectById = function (value) {
        return this._getBy("object", "id", value);
    };
    AbstractList.prototype.getObjectByName = function (value) {
        return this._getBy("object", "name", value);
    };
    AbstractList.prototype.getObjectBySlug = function (value) {
        return this._getBy("object", "slug", value);
    };
    AbstractList.prototype.getObjectByKey = function (value) {
        return this._getBy("object", "key", value);
    };
    AbstractList.prototype.toJSON = function () {
        var returnable = {}, keys = Object.keys(this);
        for (var k = 0; k < keys.length; k++) {
            if (this[keys[k]] !== undefined)
                returnable[keys[k]] = this[keys[k]];
        }
        return returnable;
    };
    AbstractList.prototype.toString = function () {
        return "[object " + this.constructor.name + "]";
    };
    AbstractList.prototype.getBy = function (get, by, compare) {
        var keys = Object.keys(this);
        for (var k in keys) {
            var key = keys[k], obj = this[key], should = false;
            if (get === "id") {
                switch (by) {
                    case "name":
                        should = (obj.name === compare);
                        break;
                    case "slug":
                        should = (obj.slug === compare);
                        break;
                    default:
                        should = (key === compare);
                        break;
                }
                if (should === true)
                    return obj.id;
            }
            else if (get === "name") {
                switch (by) {
                    case "id":
                        should = (obj.id === compare);
                        break;
                    case "slug":
                        should = (obj.slug === compare);
                        break;
                    default:
                        should = (key === compare);
                        break;
                }
                if (should === true)
                    return obj.name;
            }
            else if (get === "slug") {
                switch (by) {
                    case "id":
                        should = (obj.id === compare);
                        break;
                    case "name":
                        should = (obj.name === compare);
                        break;
                    default:
                        should = (key === compare);
                        break;
                }
                if (should === true)
                    return obj.slug;
            }
            else if (get === "key") {
                switch (by) {
                    case "id":
                        should = (obj.id === compare);
                        break;
                    case "name":
                        should = (obj.name === compare);
                        break;
                    case "slug":
                        should = (obj.slug === compare);
                        break;
                }
                if (should === true)
                    return key;
            }
            else if (get === "object") {
                switch (by) {
                    case "id":
                        should = (obj.id === compare);
                        break;
                    case "name":
                        should = (obj.name === compare);
                        break;
                    case "slug":
                        should = (obj.slug === compare);
                        break;
                    default:
                        should = (key === compare);
                        break;
                }
                if (should === true)
                    return obj;
            }
        }
        return false;
    };
    return AbstractList;
}(AbstractSingleton_1.AbstractSingleton));
exports.AbstractList = AbstractList;
