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
