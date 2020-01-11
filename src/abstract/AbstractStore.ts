/**
 * abstract/AbstractStore
 * ----------------------------------------------------------------------
 * Sets a basic interface for a storage management, be it local, session or
 * another type.
 *
 * Being an `Abstract` class, it can't (or shouldn't) be directly instantiated.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export abstract class AbstractStore {
  // LIFECYCLE
  // --------------------------------------------------------------------
  
  /**
   * Constructor.
   */
  constructor () {
    let name: String = (this.constructor as typeof AbstractStore).name;
    if (name === "AbstractStore") {
      throw new TypeError(
        `Abstract class '${name}' cannot be instantiated on its own.`
      );
    }
  }

  // PUBLIC METHODS
  // --------------------------------------------------------------------
  
  /**
   * Retrieves a single key from this store.
   * 
   * @param key 
   *     Name of the key you want to retrieve
   */
  public abstract get (key: string): any;
  
  /**
   * Retrieves an object containing all keys on this store.
   */
  public abstract getAll (): any;
  
  /**
   * Sets a single item on this store.
   * 
   * @param key 
   *     Key to be stored  
   * @param value 
   *     Value to attach to the key
   */
  public abstract set (key: string, value: any): AbstractStore|void;
  
  /**
   * Removes a single item from this store.
   * 
   * @param key 
   *     Key to be removed from store
   */
  public abstract remove (key: string): AbstractStore|void;
  
  /**
   * Clears all items from this store.
   */
  public abstract clear (): AbstractStore|void;

  /**
   * Returns a string representation of an object, overrides default method.
   */
  public toString (): string {
    return `[object ${this.constructor.name}]`;
  }
}
