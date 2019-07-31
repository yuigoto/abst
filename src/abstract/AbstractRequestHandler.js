/**
 * Core/Abstract/AbstractRequestHandler
 * ----------------------------------------------------------------------
 * Provides a basic interface used to standardize how request objects are 
 * created and used, also how we parse data before and after a request is 
 * made, or when an error happens.
 * 
 * You can either use a `baseUrl` and attach endpoint when making a request, 
 * or just provide a fully valid URL when doing so.
 * 
 * It also declares some helper methods to manage data interceptors before or 
 * after a request is made, or to parse error messages.
 * 
 * All child methods of this class **MUST** declare the `request` method, which 
 * should accept a `url`, a `data` object and a HTTP request `method`. You can 
 * then return a `Promise` or just use `await`.
 * 
 * Being an `Abstract` class, it can't be directly instantiated.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export class AbstractRequestHandler {
  // Private Properties
  // --------------------------------------------------------------------
  
  /**
   * Base URL used for requests.
   * 
   * @type {String}
   * @private
   */
  _baseUrl = null;

  /**
   * Stores key/value pairs of parameters to be used as request headers.
   * 
   * @type {Object}
   * @private
   */
  _headers = {};

  /**
   * Stores interceptor functions to parse data before a request is sent.
   * 
   * IMPORTANT:
   * Everything happens on a chain reaction, with the result of the function 
   * being passed to the next one, and so on, until the last is executed and 
   * returned. Do mind this when declaring functions.
   * 
   * @type {Array}
   * @private
   */
  _dataInterceptors = [];

  /**
   * Stores interceptor functions to parse data when an error happens in a 
   * request.
   * 
   * IMPORTANT:
   * Everything happens on a chain reaction, with the result of the function 
   * being passed to the next one, and so on, until the last is executed and 
   * returned. Do mind this when declaring functions.
   * 
   * @type {Array}
   * @private
   */
  _errorInterceptors = [];

  /**
   * Stores interceptor functions to parse data after a request is sent.
   * 
   * IMPORTANT:
   * Everything happens on a chain reaction, with the result of the function 
   * being passed to the next one, and so on, until the last is executed and 
   * returned. Do mind this when declaring functions.
   * 
   * @type {Array}
   * @private
   */
  _resultInterceptors = [];

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Constructor.
   * 
   * @param {String} baseUrl 
   *     Base URL to be used as root for all requests, its use is optional, but 
   *     declaring it is mandatory. Must include protocol (http/https)
   */
  constructor(baseUrl) {
    let constructorName = this.constructor.name;
    if (this.constructor.name === "AbstractRequestHandler") {
      throw new TypeError(
        `Abstract class '${constructorName}' cannot be instantiated on its own.`
      );
    }

    /**
     * Stores the method list that child-classes must declare.
     *
     * Each array has the following index values:
     * - 0: the method name;
     * - 1: the method parameters, separated by commas;
     *
     * @type {Array}
     */
    let methodList = [
      ["request", "url, data, method"]
    ];

    // Check method existence
    for (let n = 0; n < methodList.length; n++) {
      let _method = methodList[n];
      if (this[_method[0]] === undefined) {
        if (!_method[1]) _method[1] = "";

        throw new TypeError(
          `Classes extending '${constructorName}' must declare the '${_method[0]}(${_method[1]})' method.`
        );
      }

      // Bind method to class scope
      this[_method[0]] = this[_method[0]].bind(this);
    }

    this._setBaseUrl(baseUrl);
  }

  // Getters + Setters
  // --------------------------------------------------------------------

  /**
   * Base URL used for requests.
   * 
   * @type {String}
   */
  get baseUrl () {
    return this._baseUrl;
  }

  set baseUrl (value) {
    this._setBaseUrl(value);
  }

  /**
   * Key/value mappings used in request headers.
   * 
   * @type {Object}
   */
  get headers () {
    return this._headers;
  }

  set headers (value) {
    this._headers = value;
  }

  /**
   * Stores callable functions used to intercept data BEFORE they're sent 
   * to the request.
   * 
   * @type {Array}
   */
  get dataInterceptors () {
    return this._dataInterceptors;
  }

  set dataInterceptors (value) {
    for (let v = 0; v < value.length; v++) {
      if (typeof value[v] !== "function") {
        throw new TypeError(
          "Invalid interceptor provided. Not a valid callable."
        );
      }
    }

    this._dataInterceptors = value;
  }

  /**
   * Stores callable functions used to intercept error data AFTER a request 
   * is sent to the server.
   * 
   * @type {Array}
   */
  get errorInterceptors () {
    return this._errorInterceptors;
  }

  set errorInterceptors (value) {
    for (let v = 0; v < value.length; v++) {
      if (typeof value[v] !== "function") {
        throw new TypeError(
          "Invalid interceptor provided. Not a valid callable."
        );
      }
    }

    this._errorInterceptors = value;
  }

  /**
   * Stores callable functions used to intercept data returned by the request.
   * 
   * @type {Array}
   */
  get resultInterceptors () {
    return this._resultInterceptors;
  }

  set resultInterceptors (value) {
    for (let v = 0; v < value.length; v++) {
      if (typeof value[v] !== "function") {
        throw new TypeError(
          "Invalid interceptor provided. Not a valid callable."
        );
      }
    }

    this._resultInterceptors = value;
  }

  // Public Methods
  // --------------------------------------------------------------------

  /**
   * Appends a callable function to the `dataInterceptors` list.
   * 
   * Returns the index of the callable inside the array.
   * 
   * IMPORTANT:
   * Interceptors run on a single-line queue, being stacked on top of 
   * each other, from first to last. Mind this and be careful when setting!
   * 
   * @param {Function} callable 
   *     Callable to be used as data interceptor, receives data, returns 
   *     modified data 
   * @returns {Number|Boolean}
   */
  addDataInterceptor (callable) {
    if (typeof callable === "function") {
      let pushed = this.dataInterceptors.push(callable);
      return (typeof pushed === "number") ? (pushed - 1) : 0;
    }

    return false;
  }

  /**
   * Applies interceptors to the data before a request is made.
   * 
   * @param {*} data 
   *     Data to be intercepted 
   * @returns {*}
   */
  applyDataInterceptors (data) {
    for (let n = 0; n < this.dataInterceptors; n++) {
      data = this.dataInterceptors[n](data);
    }
    return data;
  }

  /**
   * Removes an interceptor function from the `dataInterceptors` array.
   * 
   * This method also changes the index values of the source array. Bear this 
   * in mind if you're storing a reference for each interceptor. 
   * 
   * @param {Number} index 
   *     Index of the callable function inside the array 
   * @returns {Boolean} 
   */
  removeDataInterceptor (index) {
    if (
      this.dataInterceptors[index] 
      && typeof this.dataInterceptors[index] === "function"
    ) {
      this.dataInterceptors.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Appends a callable function to the `errorInterceptors` list.
   * 
   * Returns the index of the callable inside the array.
   * 
   * IMPORTANT:
   * Interceptors run on a single-line queue, being stacked on top of 
   * each other, from first to last. Mind this and be careful when setting!
   * 
   * @param {Function} callable 
   *     Callable to be used as data interceptor, receives data, returns 
   *     modified data 
   * @returns {Number|Boolean}
   */
  addErrorInterceptor (callable) {
    if (typeof callable === "function") {
      let pushed = this.errorInterceptors.push(callable);
      return (typeof pushed === "number") ? (pushed - 1) : 0;
    }
    
    return false;
  }

  /**
   * Applies interceptors to the data when a request error is on catch.
   * 
   * @param {*} data 
   *     Data to be intercepted 
   * @returns {*}
   */
  applyErrorInterceptors (data) {
    for (let n = 0; n < this.errorInterceptors; n++) {
      data = this.errorInterceptors[n](data);
    }
    return data;
  }

  /**
   * Removes an interceptor function from the `errorInterceptors` array.
   * 
   * This method also changes the index values of the source array. Bear this 
   * in mind if you're storing a reference for each interceptor. 
   * 
   * @param {Number} index 
   *     Index of the callable function inside the array 
   * @returns {Boolean} 
   */
  removeErrorInterceptor (index) {
    if (
      this.errorInterceptors[index] 
      && typeof this.errorInterceptors[index] === "function"
    ) {
      this.errorInterceptors.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Appends a callable function to the `resultInterceptors` list.
   * 
   * Returns the index of the callable inside the array.
   * 
   * IMPORTANT:
   * Interceptors run on a single-line queue, being stacked on top of 
   * each other, from first to last. Mind this and be careful when setting!
   * 
   * @param {Function} callable 
   *     Callable to be used as data interceptor, receives data, returns 
   *     modified data 
   * @returns {Number|Boolean}
   */
  addResultInterceptor (callable) {
    if (typeof callable === "function") {
      let pushed = this.resultInterceptors.push(callable);
      return (typeof pushed === "number") ? (pushed - 1) : 0;
    }
    
    return false;
  }

  /**
   * Applies interceptors to the received data after a request is made.
   * 
   * @param {*} data 
   *     Data to be intercepted 
   * @returns {*}
   */
  applyResultInterceptors (data) {
    for (let n = 0; n < this.resultInterceptors; n++) {
      data = this.resultInterceptors[n](data);
    }
    return data;
  }

  /**
   * Removes an interceptor function from the `resultInterceptors` array.
   * 
   * This method also changes the index values of the source array. Bear this 
   * in mind if you're storing a reference for each interceptor. 
   * 
   * @param {Number} index 
   *     Index of the callable function inside the array 
   * @returns {Boolean} 
   */
  removeResultInterceptor (index) {
    if (
      this.resultInterceptors[index] 
      && typeof this.resultInterceptors[index] === "function"
    ) {
      this.resultInterceptors.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Adds a header to the request handler.
   * 
   * @param {String} key 
   *     Parameter name 
   * @param {String|Number} value 
   *     Parameter value 
   * @returns {AbstractRequestHandler}
   */
  addHeader (key, value) {
    this._headers[key] = value;
    return this;
  }

  /**
   * Clears all headers.
   * 
   * @returns {AbstractRequestHandler}
   */
  clearHeaders () {
    this.headers = {};
    return this;
  }

  /**
   * Removes a header from the request handler.
   * 
   * @param {String} key 
   *     Parameter name 
   * @returns {AbstractRequestHandler}
   */
  removeHeader (key) {
    delete this.headers[key];
    return this;
  }

  /**
   * Sets default headers, which forces sending as `form-urlencoded`.
   * 
   * @returns {AbstractRequestHandler}
   */
  setDefaultHeaders () {
    this.headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset-UTF-8"
    };
    return this;
  }

  /**
   * Checks if a HTTP method is valid or not.
   *
   * @param {String} method
   *     Method name to test
   * @returns {Boolean}
   */
  isMethodValid (method) {
    return /(POST|GET|PUT|DELETE|HEAD|CONNECT|OPTIONS|TRACE)/.test(method);
  }

  /**
   * Checks if input is a valid endpoint/path-type string.
   *
   * @param {String} input
   *     String to validate
   * @returns {Boolean}
   */
  isValidEndpoint (input) {
    if (typeof input !== "string") return false;
    return /^\/?([^/\r\n]+\/?)+$/i.test(input.trim());
  }

  /**
   * Checks if input value is a valid URL with protocol.
   *
   * @param {String} url
   *     URL to validate
   * @return {Boolean}
   */
  isValidUrl (url) {
    if (typeof url !== "string") return false;
    return /^(https?:\/\/)([^/]+\/?)+$/i.test(url.trim());
  }

  /**
   * Trims slashes from the beginning and end of the string.
   *
   * @param {String} input
   *     String to trim
   * @returns {String}
   */
  trimSlashes (input) {
    return input.replace(
      /(^\/|\/$)/g,
      ""
    );
  }

  // Private Methods
  // --------------------------------------------------------------------

  /**
   * Sets the base URL for requests.
   * 
   * @param {String} url  
   *     New base URL, with protocol
   * @private
   */
  _setBaseUrl (url) {
    if (!this.isValidUrl(url)) {
      throw new TypeError(
        `'${url}' is not a valid URL.`
      );
    }

    this._baseUrl = (/\/$/.test(url.trim())) 
      ? url.trim() 
      : url.trim() + "/";
  }
}
