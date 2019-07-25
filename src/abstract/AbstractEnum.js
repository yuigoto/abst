import { AbstractSingleton } from "./AbstractSingleton";

/**
 * Core/Abstract/AbstractEnum
 * ----------------------------------------------------------------------
 * Provides a basic interface for the creation of enum-like objects. You 
 * must provide a hashmap-like object to the constructor, so it can properly 
 * initialize the enumerator.
 * 
 * There's also search methods available, if you ever need one.
 * 
 * Being an `Abstract` class, it can't be directly instantiated.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export class AbstractEnum extends AbstractSingleton {
  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Constructor.
   *
   * @param {Object} enumObject
   *     Enum-like object, containing key-value pairs of distinct strings 
   *     mapped to numbers
   */
  constructor (enumObject) {
    super();

    let constructorName = this.constructor.name;
    if (this.constructor.name === "AbstractEnum") {
      throw new TypeError(
        `Abstract class '${constructorName}' cannot be instantiated on its own.`
      );
    }

    // Adds items
    if (Object.keys(this).length === 0) {
      for (let key of Object.keys(enumObject)) {
        // MUST BE DISTINCT
        if (
          this[key] !== undefined
          && (
            Object.keys(this).indexOf(key) > -1
            || Object.keys(this).indexOf(enumObject[key]) > -1
          )
        ) {
          throw new TypeError(
            `Enum keys and values must be distinct.`
          );
        }

        this[key] = enumObject[key];
      }
    }
  }

  // Public Methods
  // --------------------------------------------------------------------

  /**
   * Returns the entry key based on its value, if non-existent, returns
   * "UNKNOWN" (be careful when overriding).
   *
   * @param {Number} value
   *     Value attached to a key
   * @returns {String}
   */
  get (value) {
    if (!this._isValid(value)) return "UNKNOWN";

    return Object
      .keys(this)
      .find((key) => {
        return this[key] === value;
      });
  }

  /**
   * Returns all keys from this enum as an array.
   *
   * @returns {Array}
   */
  getKeys () {
    return Object.keys(this);
  }

  /**
   * Returns all values from this enum as an array.
   *
   * @returns {Array}
   */
  getValues () {
    if (Object.hasOwnProperty("values")) return Object.values(this);

    let keys = Object.keys(this),
        returnable = [];

    for (let n = 0; n < keys.length; n++) {
      if (keys[n] !== undefined) {
        returnable.push(this[keys[n]]);
      }
    }

    return returnable;
  }

  /**
   * Returns a POJO from this class' instance, overriding the default
   * `toJSON()` method.
   *
   * @returns {Object}
   */
  toJSON () {
    let returnable = {};

    let keys = Object.keys(this);
    for (let k = 0; k < keys.length; k++) {
      if (this[keys[k]] !== undefined) {
        returnable[keys[k]] = this[keys[k]];
      }
    }

    return returnable;
  }

  /**
   * Overrides the base method for string conversion.
   *
   * @returns {String}
   */
  toString () {
    return `[object ${this.constructor.name}]`;
  }

  // Private Methods
  // --------------------------------------------------------------------

  /**
   * Checks if the provided value is valid for this enum.
   *
   * @param {Number} value
   *     Value to check
   * @returns {Boolean}
   * @private
   */
  _isValid (value) {
    return (Object.values(this).indexOf(value) > -1);
  }
}
