/**
 * Core/Abstract/AbstractSingleton
 * ----------------------------------------------------------------------
 * Sets basic definitions for singleton-type classes in JavaScript.
 *
 * The `_instance` property is inherited by child-classes and it's responsible
 * for the singleton-like features to work.
 *
 * Being an `Abstract` class, it can't be directly instantiated.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export class AbstractSingleton {
  // Static Properties
  // --------------------------------------------------------------------

  /**
   * Stores an instance of this class or any extending this one, to guarantee
   * that's a singleton.
   *
   * @type {this}
   * @static
   */
  static _instance;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Constructor.
   *
   * @returns {this}
   */
  constructor () {
    let constructorName = this.constructor.name;
    if (this.constructor.name === "AbstractSingleton") {
      throw new TypeError(
        `Abstract class '${constructorName}' cannot be instantiated on its own.`
      );
    }

    if (this.constructor._instance) return this.constructor._instance;
    this.constructor._instance = this;
  }
}
