/**
 * Core/Abstract/AbstractParser
 * ----------------------------------------------------------------------
 * Sets basic definitions for parsers, which can be used to check data for
 * validation and/or as filter.
 *
 * Child-classes of this one must declare the following methods:
 * - `parse()`, which is used to parse the data;
 *
 * Being an `Abstract` class, it can't be directly instantiated.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export class AbstractParser {
  // Private Properties
  // --------------------------------------------------------------------

  /**
   * Parser input value.
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
   *     Input value to parse
   */
  constructor (input) {
    let constructorName = this.constructor.name;
    if (this.constructor.name === "AbstractParser") {
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
      ["parse", null]
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
   * Parser input value.
   *
   * @returns {*}
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
   * Overrides the base method for string conversion.
   *
   * @returns {String}
   */
  toString () {
    return `[object ${this.constructor.name}]`;
  }
}
