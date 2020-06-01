/**
 * abstract/AbstractAuthentication
 * ----------------------------------------------------------------------
 * Sets basic definitions for a basic authentication and login status
 * controller.
 *
 * Being an `Abstract` class, it can't (or shouldn't) be directly instantiated.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export abstract class AbstractAuthentication {
  /**
   * Class index signature, so we won't have any implicitAny errors.
   */
  [key: string]: any;
  
  // LIFECYCLE
  // --------------------------------------------------------------------

  /**
   * Constructor.
   */
  constructor () {
    let name: String = (this.constructor as typeof AbstractAuthentication).name;
    if (name === "AbstractParser") {
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
      ["authenticate", "user"],
      ["logout", null],
      ["status", null]
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
  }
  
  // PUBLIC METHODS
  // --------------------------------------------------------------------

  /**
   * Executes authentication for the user object provided.
   * 
   * @param user 
   *     User object to use for authentication 
   */
  public abstract authenticate(user: any): any;

  /**
   * Finished the current user's session.
   */
  public abstract logout(): any;

  /**
   * Returns the login status of the current user.
   */
  public abstract status(): any;

  /**
   * Returns a string representation of an object, overrides default method.
   */
  public toString (): string {
    return `[object ${this.constructor.name}]`;
  }
}
