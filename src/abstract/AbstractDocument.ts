import { JsonObject } from "../core/Types";

/**
 * abstract/AbstractDocument
 * ----------------------------------------------------------------------
 * Provides a basic interface for document number validation and formatting.
 *
 * Being an `Abstract` class, it can't (or shouldn't) be directly instantiated.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export abstract class AbstractDocument {
  // PRIVATE PROPERTIES
  // --------------------------------------------------------------------

  /**
   * Input document value for validation.
   */
  protected _input: any = null;

  /**
   * Maximum/ideal length for the document input.
   */
  protected _length: number = null;

  // LIFECYCLE
  // --------------------------------------------------------------------

  /**
   * Constructor.
   *
   * @param input
   *     String with the document number to validate
   * @param length
   *     Maximum/ideal length for the document input
   */
  constructor (input: any, length: number) {
    let name: String = (this.constructor as typeof AbstractDocument).name;
    if (name === "AbstractDocument") {
      throw new TypeError(
        `Abstract class '${name}' cannot be instantiated on its own.`
      );
    }

    this._input = input;
    this._length = length;
  }

  // GETTERS + SETTERS
  // --------------------------------------------------------------------

  /**
   * Input document value for validation.
   */
  get input (): any {
    return this._input;
  }

  set input (value: any) {
    this._input = value;
  }

  /**
   * Maximum/ideal length for the document.
   */
  get length (): number {
    return this._length;
  }

  set length (value: number) {
    this._length = value;
  }

  // PUBLIC METHODS
  // --------------------------------------------------------------------
  
  /**
   * Validates the current document on `input`, also validates `length`.
   */
  public abstract validate (): boolean;
  
  /**
   * Formats the document, returns the formatted string.
   */
  public abstract format (): any;
  
  /**
   * Returns a POJO representation of this class' object, this is called when
   * `JSON.stringify` is used on an instance of this class.
   */
  public toJSON (): JsonObject {
    let isValid = (this.hasOwnProperty("validate")) 
          ? this["validate"]() : false,
        formattedValue = (this.hasOwnProperty("format"))
          ? this["format"]() : "";
    
    return {
      value: this.input || "",
      formattedValue: formattedValue || "",
      isValid: isValid || false
    };
  }

  /**
   * Returns a string representation of an object, overrides default method.
   */
  public toString (): string {
    return `[object ${this.constructor.name}]`;
  }
}
