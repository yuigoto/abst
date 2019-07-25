/**
 * @yuigoto/abst/AbstractValidation
 * ----------------------------------------------------------------------
 * Implements a basic interface for a validator-type class.
 *
 * Validates a single input at a time.
 * 
 * Child-classes of this one must declare the following methods:
 * - `validate()` which returns a boolean for the current `input`;
 * - `message()` which returns a string, based on the return of `validate()`;
 *
 * Being an `Abstract` class, it can't be directly instantiated.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export class AbstractValidation {
  // Private Properties
  // --------------------------------------------------------------------

  /**
   * Input value for validation.
   *
   * @type {*}
   * @private
   */
  _input = null;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Constructor.
   *
   * @param {*} input
   *     Input value for validation
   */
  constructor (input) {
    let constructorName = this.constructor.name;
    if (this.constructor.name === "AbstractValidation") {
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
      ["validate", null],
      ["message", null]
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

    this._input = input;
  }

  // Getters + Setters
  // --------------------------------------------------------------------

  /**
   * Input value for validation.
   *
   * @type {*}
   */
  get input () {
    return this._input;
  }

  set input (value) {
    this._input = value;
  }

  // Public Methods
  // --------------------------------------------------------------------

  /**
   * Returns a POJO from this class' instance, overriding the default
   * `toJSON()` method.
   *
   * @returns {Object}
   */
  toJSON () {
    // Validation status and message
    let validation = (this.hasOwnProperty("validation"))
          ? this["validation"]() : false,
        message = (this.hasOwnProperty("message"))
          ? this["message"]() : "";

    return {
      input: this.input,
      validation: validation || false,
      message: message || null
    };
  }

  /**
   * Overrides the base method for string conversion.
   *
   * @returns {String}
   */
  toString () {
    return `[object ${this.constructor.name}]`;
  }
}
