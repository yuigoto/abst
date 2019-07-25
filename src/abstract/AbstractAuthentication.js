/**
 * Core/Abstract/AbstractAuthentication
 * ----------------------------------------------------------------------
 * Sets basic definitions for a basic authentication and login status
 * controller.
 *
 * Child-classes of this one must declare the following methods:
 * - `status()`, used to check login status and validate sessions;
 * - `authenticate(user)`, used to login and create a session;
 * - `logout()`, used to logout and wipe the session;
 *
 * Being an `Abstract` class, it can't be directly instantiated.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export class AbstractAuthentication {
  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Constructor.
   */
  constructor () {
    let constructorName = this.constructor.name;
    if (this.constructor.name === "AbstractAuthentication") {
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
      ["authenticate", "user"],
      ["logout", null],
      ["status", null]
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
