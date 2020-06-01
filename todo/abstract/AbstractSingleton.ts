import { Extendable } from "../core/Interfaces";

/**
 * abstract/AbstractSingleton
 * ----------------------------------------------------------------------
 * Sets basic definitions for singleton-type classes in JavaScript.
 *
 * The `_instance` property is inherited by child-classes and it's responsible
 * for the singleton-like features to work.
 *
 * Being an `Abstract` class, it can't (or shouldn't) be directly instantiated.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export abstract class AbstractSingleton implements Extendable {
  /**
   * Class index signature, so we won't have any implicitAny errors.
   */
  [key: string]: any;
  
  // PRIVATE PROPERTIES
  // --------------------------------------------------------------------

  /**
   * Stores an instance of this class or any extending this one, to guarantee
   * that's a singleton.
   *
   * @type {this}
   */
  private static _instance: AbstractSingleton;

  // LIFECYCLE
  // --------------------------------------------------------------------

  /**
   * Constructor.
   */
  protected constructor () {
    let name: String = (this.constructor as typeof AbstractSingleton).name;
    if (name === "AbstractSingleton") {
      throw new TypeError(
        `Abstract class '${name}' cannot be instantiated on its own.`
      );
    }

    if ((this.constructor as typeof AbstractSingleton)._instance) {
      return (this.constructor as typeof AbstractSingleton)._instance;
    }
    (this.constructor as typeof AbstractSingleton)._instance = this;
  }

  // PUBLIC METHODS
  // --------------------------------------------------------------------

  /**
   * Returns a string representation of an object, overrides default method.
   */
  public toString (): string {
    return `[object ${this.constructor.name}]`;
  }
}
