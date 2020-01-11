"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validators_1 = require("@yuigoto/validators");
var AbstractRequestHandler = (function () {
    function AbstractRequestHandler(baseUrl) {
        this._baseUrl = null;
        this._headers = {};
        this._dataInterceptors = [];
        this._errorInterceptors = [];
        this._resultInterceptors = [];
        var name = this.constructor.name;
        if (name === "AbstractRequestHandler") {
            throw new TypeError("Abstract class '" + name + "' cannot be instantiated on its own.");
        }
        var methodList = [
            ["request", "endpoint, data, method, headers"],
            ["requestUrl", "url, data, method, headers"]
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
        this.setBaseUrl(baseUrl);
    }
    Object.defineProperty(AbstractRequestHandler.prototype, "baseUrl", {
        get: function () {
            return this._baseUrl;
        },
        set: function (value) {
            this._baseUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractRequestHandler.prototype, "headers", {
        get: function () {
            return this._headers;
        },
        set: function (value) {
            this._headers = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractRequestHandler.prototype, "dataInterceptors", {
        get: function () {
            return this._dataInterceptors;
        },
        set: function (value) {
            for (var v = 0; v < value.length; v++) {
                if (typeof value[v] !== "function") {
                    throw new TypeError("Invalid interceptor provided. Not a valid function.");
                }
            }
            this._dataInterceptors = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractRequestHandler.prototype, "errorInterceptors", {
        get: function () {
            return this._errorInterceptors;
        },
        set: function (value) {
            for (var v = 0; v < value.length; v++) {
                if (typeof value[v] !== "function") {
                    throw new TypeError("Invalid interceptor provided. Not a valid function.");
                }
            }
            this._errorInterceptors = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractRequestHandler.prototype, "resultInterceptors", {
        get: function () {
            return this._resultInterceptors;
        },
        set: function (value) {
            for (var v = 0; v < value.length; v++) {
                if (typeof value[v] !== "function") {
                    throw new TypeError("Invalid interceptor provided. Not a valid function.");
                }
            }
            this._resultInterceptors = value;
        },
        enumerable: true,
        configurable: true
    });
    AbstractRequestHandler.prototype.addDataInterceptor = function (interceptor) {
        if (typeof interceptor === "function") {
            var pushed = this.dataInterceptors.push(interceptor);
            return (typeof pushed === "number") ? (pushed - 1) : 0;
        }
        return false;
    };
    AbstractRequestHandler.prototype.applyDataInterceptors = function (data) {
        for (var n = 0; n < this.dataInterceptors.length; n++) {
            data = this.dataInterceptors[n](data);
        }
        return data;
    };
    AbstractRequestHandler.prototype.removeDataInterceptor = function (index) {
        if (this.dataInterceptors[index]
            && typeof this.dataInterceptors[index] === "function") {
            this.dataInterceptors.splice(index, 1);
            return true;
        }
        return false;
    };
    AbstractRequestHandler.prototype.clearDataInterceptors = function () {
        this.dataInterceptors = [];
        return this;
    };
    AbstractRequestHandler.prototype.addErrorInterceptor = function (interceptor) {
        if (typeof interceptor === "function") {
            var pushed = this.errorInterceptors.push(interceptor);
            return (typeof pushed === "number") ? (pushed - 1) : 0;
        }
        return false;
    };
    AbstractRequestHandler.prototype.applyErrorInterceptors = function (data) {
        for (var n = 0; n < this.errorInterceptors.length; n++) {
            data = this.errorInterceptors[n](data);
        }
        return data;
    };
    AbstractRequestHandler.prototype.removeErrorInterceptor = function (index) {
        if (this.errorInterceptors[index]
            && typeof this.errorInterceptors[index] === "function") {
            this.errorInterceptors.splice(index, 1);
            return true;
        }
        return false;
    };
    AbstractRequestHandler.prototype.clearErrorInterceptors = function () {
        this.errorInterceptors = [];
        return this;
    };
    AbstractRequestHandler.prototype.addResultInterceptor = function (interceptor) {
        if (typeof interceptor === "function") {
            var pushed = this.resultInterceptors.push(interceptor);
            return (typeof pushed === "number") ? (pushed - 1) : 0;
        }
        return false;
    };
    AbstractRequestHandler.prototype.applyResultInterceptors = function (data) {
        for (var n = 0; n < this.resultInterceptors.length; n++) {
            data = this.resultInterceptors[n](data);
        }
        return data;
    };
    AbstractRequestHandler.prototype.removeResultInterceptor = function (index) {
        if (this.resultInterceptors[index]
            && typeof this.resultInterceptors[index] === "function") {
            this.resultInterceptors.splice(index, 1);
            return true;
        }
        return false;
    };
    AbstractRequestHandler.prototype.clearResultInterceptors = function () {
        this.resultInterceptors = [];
        return this;
    };
    AbstractRequestHandler.prototype.addHeader = function (key, value) {
        this._headers[key] = value;
        return this;
    };
    AbstractRequestHandler.prototype.clearHeaders = function () {
        this.headers = {};
        return this;
    };
    AbstractRequestHandler.prototype.removeHeader = function (key) {
        delete this.headers[key];
        return this;
    };
    AbstractRequestHandler.prototype.isMethodValid = function (method) {
        return /(POST|GET|PUT|DELETE|HEAD|CONNECT|OPTIONS|TRACE)/.test(method);
    };
    AbstractRequestHandler.prototype.isValidEndpoint = function (input) {
        if (typeof input !== "string")
            return false;
        return /^\/?([^/\r\n]+\/?)+$/i.test(input.trim());
    };
    AbstractRequestHandler.prototype.trimSlashes = function (input) {
        return input.replace(/(^\/|\/$)/g, "");
    };
    AbstractRequestHandler.prototype.toString = function () {
        return "[object " + this.constructor.name + "]";
    };
    AbstractRequestHandler.prototype.setBaseUrl = function (url) {
        if (!validators_1.Url.validate(url))
            throw new TypeError("'" + url + "' is not a valid URL.");
        this._baseUrl = (/\/$/.test(url.trim())) ? url.trim() : url.trim() + "/";
    };
    return AbstractRequestHandler;
}());
exports.AbstractRequestHandler = AbstractRequestHandler;
