import { EnumObject } from "../core/Types";
import { AbstractSingleton } from "../abstract/AbstractSingleton";

/**
 * abstract/AbstractEnum
 * ----------------------------------------------------------------------
 * Provides a basic interface for the creation of enum-like objects. You
 * must provide a hashmap-like object to the constructor, so it can properly
 * initialize the enumerator.
 *
 * There's also search methods available, if you ever need one.
 *
 * Being an `Abstract` class, it can't (or shouldn't) be directly instantiated.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export abstract class AbstractEnum extends AbstractSingleton {
  // LIFECYCLE
  // --------------------------------------------------------------------

  /**
   * Constructor.
   * 
   * @param enumerator
   *     Enum-like object, containing key-value pairs of distinct strings
   *     mapped to numbers
   */
  constructor (enumerator: EnumObject) {
    super();
    
    let name: String = (this.constructor as typeof AbstractEnum).name;
    if (name === "AbstractEnum") {
      throw new TypeError(
        `Abstract class '${name}' cannot be instantiated on its own.`
      );
    }

    let selfKeys: string[] = Object.keys(this),
        selfVals: number[] = Object.keys(this).map((key) => this[key]),
        enumKeys: string[] = Object.keys(enumerator);

    if (selfKeys.length === 0) {
      for (let key of enumKeys) {
        try {
          if (
            selfKeys.indexOf(key) > -1
            || selfVals.indexOf(enumerator[key]) > -1
          ) {
            throw new TypeError(
              `Enumerator keys and values must be distinct.`
            );
          }
          
          this[key] = enumerator[key];

          selfKeys = Object.keys(this);
          selfVals = Object.keys(this).map((key) => this[key]);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  // PUBLIC METHOD
  // --------------------------------------------------------------------

  /**
   * Returns the entry key, based on its value. If the value wasn't declared,
   * it should return "UNKNOWN" (careful when overriding this key).
   *
   * @param value
   *     Value to check for key
   */
  public get (value: number): string {
    if (!this.isValidValue(value)) return "UNKNOWN";
    return this.getKeys().find((key) => this[key] === value);
  }

  /**
   * Returns an array containing all keys from this enumerator.
   */
  public getKeys (): string[] {
    return Object.keys(this);
  }

  /**
   * Returns an array containing all values from this enumerator.
   */
  public getValues (): number[] {
    return Object.keys(this).map((key) => this[key]);
  }

  /**
   * Returns a POJO representation of this class' object, this is called when
   * `JSON.stringify` is used on an instance of this class.
   */
  public toJSON (): EnumObject {
    let returnable: EnumObject = {},
        keys: string[] = Object.keys(this);

    for (let k = 0; k < keys.length; k++) {
      if (this[keys[k]] !== undefined) {
        returnable[keys[k]] = this[keys[k]];
      }
    }

    return returnable;
  }

  /**
   * Returns a string representation of an object, overrides default method.
   */
  public toString (): string {
    return `[object ${this.constructor.name}]`;
  }

  // PRIVATE METHODS
  // --------------------------------------------------------------------

  /**
   * Checks if the provided value is valid, or not, for this enumerator.
   *
   * @param value
   *     Value to test
   */
  private isValidValue (value: number): boolean {
    return (this.getValues().indexOf(value) > -1);
  }
}
