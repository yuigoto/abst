/**
 * Core/Abstract/AbstractDocument
 * ----------------------------------------------------------------------
 * Provides a basic interface for document number validation and formatting.
 * 
 * Being an `Abstract` class, it can't be directly instantiated.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export class AbstractDocument {
  // Private Properties
  // --------------------------------------------------------------------

  /**
   * Input document value for validation.
   *
   * @type {String}
   * @private
   */
  _input = null;

  /**
   * Maximum/ideal length for the document input.
   *
   * @type {Number}
   * @private
   */
  _length = null;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Constructor.
   *
   * @param {String} input
   *     String with the document number to validate
   * @param {Number} length
   *     Maximum/ideal length for the document input
   */
  constructor (input, length) {
    let constructorName = this.constructor.name;
    if (this.constructor.name === "AbstractDocument") {
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
      ["format", null],
      ["validate", null]
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
    this._length = length;
  }

  // Getters + Setters
  // --------------------------------------------------------------------

  /**
   * Input document value for validation.
   *
   * @type {String}
   */
  get input () {
    return this._input;
  }

  set input (value) {
    this._input = value;
  }

  /**
   * Maximum/ideal length for the document.
   *
   * @type {Number}
   */
  get length () {
    return this._length;
  }

  set length (value) {
    this._length = value;
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
    // Validation status and formatted value
    let isValid = (this.hasOwnProperty("validate"))
      ? this["validate"]() : false,
      formattedValue = (this.hasOwnProperty("format"))
        ? this["format"]() : "";

    return {
      value: this.input || "",
      formattedValue: formattedValue || "",
      isValid: isValid || false
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
