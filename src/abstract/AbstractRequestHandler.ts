import { Url } from "@yuigoto/validators";
import {
  Interceptor,
  RequestEndpoint,
  StringHash,
  JsonObject
} from "../core/Types";

/**
 * abstract/AbstractRequestHandler
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
 * Being an `Abstract` class, it can't (or shouldn't) be directly instantiated.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export abstract class AbstractRequestHandler {
  /**
   * Class index signature, so we won't have any implicitAny errors.
   */
  [key: string]: any;
  
  // PRIVATE PROPERTIES
  // --------------------------------------------------------------------

  /**
   * Base URL used for requests.
   */
  protected _baseUrl: string = null;

  /**
   * Stores key/value pairs of parameters to be used as request headers.
   */
  protected _headers: StringHash = {};
  
  /**
   * Stores interceptor functions to parse data before a request is sent.
   * 
   * IMPORTANT:
   * Everything happens on a chain reaction, with the result of the function 
   * being passed to the next one, and so on, until the last is executed and 
   * returned. Do mind this when declaring functions.
   */
  protected _dataInterceptors: Interceptor[] = [];

  /**
   * Stores interceptor functions to parse data when an error happens in a 
   * request.
   * 
   * IMPORTANT:
   * Everything happens on a chain reaction, with the result of the function 
   * being passed to the next one, and so on, until the last is executed and 
   * returned. Do mind this when declaring functions.
   */
  protected _errorInterceptors: Interceptor[] = [];

  /**
   * Stores interceptor functions to parse data after a request is sent.
   * 
   * IMPORTANT:
   * Everything happens on a chain reaction, with the result of the function 
   * being passed to the next one, and so on, until the last is executed and 
   * returned. Do mind this when declaring functions.
   */
  protected _resultInterceptors: Interceptor[] = [];

  // LIFECYCLE
  // --------------------------------------------------------------------

  /**
   * Constructor.
   *
   * @param baseUrl
   *     Base url to be used when executing requests
   */
  constructor(baseUrl: string) {
    let name: String = (this.constructor as typeof AbstractRequestHandler).name;
    if (name === "AbstractRequestHandler") {
      throw new TypeError(
        `Abstract class '${name}' cannot be instantiated on its own.`
      );
    }

    /**
     * Stores the method list that child-classes must declare.
     *
     * Each array has the following index values:
     * - 0: the method name;
     * - 1: the method parameters, separated by commas;
     */
    let methodList: any[] = [
      ["request", "endpoint, data, method, headers"],
      ["requestUrl", "url, data, method, headers"]
    ];
    
    // Check method existence
    for (let n = 0; n < methodList.length; n++) {
      let _method: any[] = methodList[n];
      if (this[_method[0]] === undefined) {
        if (!_method[1]) _method[1] = "";

        throw new TypeError(
          `Classes extending '${name}' must declare the '${_method[0]}(${_method[1]})' method.`
        );
      }
      
      this[_method[0]] = this[_method[0]].bind(this);
    }
    
    this.setBaseUrl(baseUrl);
  }

  // GETTERS + SETTERS
  // --------------------------------------------------------------------

  /**
   * Base URL used for requests.
   */
  get baseUrl (): string {
    return this._baseUrl;
  }
  
  set baseUrl (value: string) {
    this._baseUrl = value;
  }

  /**
   * Stores key/value pairs of parameters to be used as request headers.
   */
  get headers (): StringHash {
    return this._headers;
  }

  set headers (value: StringHash) {
    this._headers = value;
  }
  
  /**
   * Stores interceptor functions to parse data before a request is sent.
   */
  get dataInterceptors (): Interceptor[] {
    return this._dataInterceptors;
  }

  set dataInterceptors (value: Interceptor[]) {
    for (let v = 0; v < value.length; v++) {
      if (typeof value[v] !== "function") {
        throw new TypeError(
          "Invalid interceptor provided. Not a valid function."
        );
      }
    }
    
    this._dataInterceptors = value;
  }
  
  /**
   * Stores interceptor functions to parse data when an error happens in a 
   * request.
   */
  get errorInterceptors (): Interceptor[] {
    return this._errorInterceptors;
  }

  set errorInterceptors (value: Interceptor[]) {
    for (let v = 0; v < value.length; v++) {
      if (typeof value[v] !== "function") {
        throw new TypeError(
          "Invalid interceptor provided. Not a valid function."
        );
      }
    }
    
    this._errorInterceptors = value;
  }

  /**
   * Stores interceptor functions to parse data after a request is sent.
   */
  get resultInterceptors (): Interceptor[] {
    return this._resultInterceptors;
  }

  set resultInterceptors (value: Interceptor[]) {
    for (let v = 0; v < value.length; v++) {
      if (typeof value[v] !== "function") {
        throw new TypeError(
          "Invalid interceptor provided. Not a valid function."
        );
      }
    }
    
    this._resultInterceptors = value;
  }

  // PUBLIC METHODS
  // --------------------------------------------------------------------

  /**
   * Executes a request directly to an endpoint and/or URL.
   *
   * @param endpoint
   *     Object containing information about the endpoint hosted inside `baseUrl`,
   *     stores the path to be added to the end of the URL as well as an array
   *     containing request methods available for the endpoint
   * @param data
   *     The request body
   * @param method
   *     The HTTP request method verb to use when executing requests
   * @param headers
   *     Object containing key/pair values to use as request headers, they will
   *     be added to the class headers object, overriding existing ones
   * @param params 
   *     Object containing key/pair values to use as URL parameters, when the 
   *     `url` in your `endpoint` required them
   */
  public abstract request (
    endpoint: RequestEndpoint,
    data: any,
    method: string,
    headers?: StringHash,
    params?: StringHash
  ): Promise<any>;

  /**
   * Executes a request directly to a URL.
   *
   * @param url
   *     URL to use for request
   * @param data
   *     Request body
   * @param method
   *     The HTTP request method verb to use when executing requests
   * @param headers
   *     Object containing key/pair values to use as request headers, they will
   *     be added to the class headers object, overriding existing ones
   * @param params 
   *     Object containing key/pair values to use as URL parameters, when the 
   *     `url` in your `endpoint` required them
   */
  public abstract requestUrl (
    url: string,
    data: any,
    method: string,
    headers?: StringHash,
    params?: StringHash
  ): Promise<any>;
  
  /**
   * Appends an interceptor function to the `dataInterceptors` array, returning 
   * the index of the callable if valid, boolean `false` if not valid.
   * 
   * IMPORTANT:
   * Interceptors run on a single-line queue, being stacked on top of each 
   * other, FIFO. Mind this when using them!
   * 
   * @param interceptor 
   *     Interceptor function to be applied to the data, receives data and 
   *     spits it modified 
   */
  addDataInterceptor (interceptor: Interceptor): number|boolean {
    if (typeof interceptor === "function") {
      let pushed = this.dataInterceptors.push(interceptor);
      return (typeof pushed === "number") ? (pushed - 1) : 0;
    }
    
    return false;
  }
  
  /**
   * Applies interceptors to the data before a request is made.
   * 
   * @param data 
   *     Data to modify/intercept
   */
  applyDataInterceptors (data: any): any {
    for (let n = 0; n < this.dataInterceptors.length; n++) {
      data = this.dataInterceptors[n](data);
    }
    return data;
  }
  
  /**
   * Removes an interceptor function from the `dataInterceptors` array.
   * 
   * This method also changes the index values of the source array, bear this 
   * in mind when storing references to each interceptor.
   * 
   * @param index 
   *     Index of the callable function inside the interceptors array
   */
  removeDataInterceptor (index: number): boolean {
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
   * Clears all data interceptors.
   */
  clearDataInterceptors () {
    this.dataInterceptors = [];
    return this;
  }
  
  /**
   * Appends an interceptor function to the `errorInterceptors` array, returning 
   * the index of the callable if valid, boolean `false` if not valid.
   * 
   * IMPORTANT:
   * Interceptors run on a single-line queue, being stacked on top of each 
   * other, FIFO. Mind this when using them!
   * 
   * @param interceptor 
   *     Interceptor function to be applied to the data, receives data and 
   *     spits it modified 
   */
  addErrorInterceptor (interceptor: Interceptor): number|boolean {
    if (typeof interceptor === "function") {
      let pushed = this.errorInterceptors.push(interceptor);
      return (typeof pushed === "number") ? (pushed - 1) : 0;
    }
    
    return false;
  }
  
  /**
   * Applies interceptors to an error object, after a request is made.
   * 
   * @param data 
   *     Data to modify/intercept
   */
  applyErrorInterceptors (data: any): any {
    for (let n = 0; n < this.errorInterceptors.length; n++) {
      data = this.errorInterceptors[n](data);
    }
    return data;
  }
  
  /**
   * Removes an interceptor function from the `errorInterceptors` array.
   * 
   * This method also changes the index values of the source array, bear this 
   * in mind when storing references to each interceptor.
   * 
   * @param index 
   *     Index of the callable function inside the interceptors array
   */
  removeErrorInterceptor (index: number): boolean {
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
   * Clears all error interceptors.
   */
  clearErrorInterceptors () {
    this.errorInterceptors = [];
    return this;
  }
  
  /**
   * Appends an interceptor function to the `resultInterceptors` array, returning 
   * the index of the callable if valid, boolean `false` if not valid.
   * 
   * IMPORTANT:
   * Interceptors run on a single-line queue, being stacked on top of each 
   * other, FIFO. Mind this when using them!
   * 
   * @param interceptor 
   *     Interceptor function to be applied to the data, receives data and 
   *     spits it modified 
   */
  addResultInterceptor (interceptor: Interceptor): number|boolean {
    if (typeof interceptor === "function") {
      let pushed = this.resultInterceptors.push(interceptor);
      return (typeof pushed === "number") ? (pushed - 1) : 0;
    }
    
    return false;
  }
  
  /**
   * Applies interceptors to data received from a request.
   * 
   * @param data 
   *     Data to modify/intercept
   */
  applyResultInterceptors (data: any): any {
    for (let n = 0; n < this.resultInterceptors.length; n++) {
      data = this.resultInterceptors[n](data);
    }
    return data;
  }
  
  /**
   * Removes an interceptor function from the `resultInterceptors` array.
   * 
   * This method also changes the index values of the source array, bear this 
   * in mind when storing references to each interceptor.
   * 
   * @param index 
   *     Index of the callable function inside the interceptors array
   */
  removeResultInterceptor (index: number): boolean {
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
   * Clears all result interceptors.
   */
  clearResultInterceptors () {
    this.resultInterceptors = [];
    return this;
  }

  /**
   * Adds a request header key/value pair.
   *
   * @param key
   *     Request header to be added
   * @param value
   *     Value to be used as request header
   */
  addHeader (key: string, value: any): AbstractRequestHandler {
    this._headers[key] = value;
    return this;
  }

  /**
   * Clears all request headers.
   */
  clearHeaders (): AbstractRequestHandler {
    this.headers = {};
    return this;
  }

  /**
   * Removes one request header.
   *
   * @param key
   *     Request header to be removed
   */
  removeHeader (key:string) {
    delete this.headers[key];
    return this;
  }

  /**
   * Checks if the provided method is a valida HTTP request method.
   *
   * @param method
   *     Method to validate
   */
  public isMethodValid (method: string): boolean {
    return /(POST|GET|PUT|DELETE|HEAD|CONNECT|OPTIONS|TRACE)/.test(method);
  }

  /**
   * Checks if the input value is a valid endpoint/path-type string.
   *
   * @param input
   *     String to validate
   */
  public isValidEndpoint (input: any): boolean {
    if (typeof input !== "string") return false;
    return /^\/?([^/\r\n]+\/?)+$/i.test(input.trim());
  }

  /**
   * Trims slashes from the beginning and end of the provided string.
   *
   * @param input
   *     String to clean
   */
  public trimSlashes (input: string): string {
    return input.replace(
      /(^\/|\/$)/g,
      ""
    );
  }
  
  /**
   * Returns a POJO from this class' instance, overriding the default
   * `toJSON()` method.
   *
   * @returns {Object}
   */
  public toJSON (): JsonObject {
    return {
      baseUrl: this.baseUrl,
      headers: this.headers
    };
  }

  /**
   * Returns a string representation of an object, overrides default method.
   */
  public toString (): string {
    return `[object ${this.constructor.name}]`;
  }

  // PROTECTED METHODS
  // --------------------------------------------------------------------

  /**
   * Sets `baseUrl` to be used in requests.
   *
   * @param url
   *     URL to be set, must have protocol (http/https)
   */
  protected setBaseUrl (url: string) {
    if (!Url.validate(url)) throw new TypeError(`'${url}' is not a valid URL.`);
    this._baseUrl = (/\/$/.test(url.trim())) ? url.trim() : url.trim() + "/";
  }
}
