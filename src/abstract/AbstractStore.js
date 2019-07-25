/**
 * Core/Abstract/AbstractStore
 * ----------------------------------------------------------------------
 * Sets a basic interface for a storage management, be it local, session or
 * another type.
 *
 * Child-classes of this one must declare the following methods:
 * - `get(key)`: retrieves a single entry from the storage;
 * - `getAll()`: retrieves everything from the storage;
 * - `set(key, value)`: sets one key in the storage;
 * - `remove(key)`: removes an entry from the storage;
 * - `clear()`: wipes everything;
 *
 * Being an `Abstract` class, it can't be directly instantiated.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export class AbstractStore {
  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Constructor.
   */
  constructor () {
    let constructorName = this.constructor.name;
    if (this.constructor.name === "AbstractStore") {
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
      ["get", "key"],
      ["getAll", null],
      ["set", "key, value"],
      ["remove", "key"],
      ["clear", null]
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
  }
}
