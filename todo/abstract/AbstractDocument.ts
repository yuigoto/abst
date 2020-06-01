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
  /**
   * Class index signature, so we won't have any implicitAny errors.
   */
  [key: string]: any;
  
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

    /**
     * Stores the method list that child-classes must declare.
     *
     * Each array has the following index values:
     * - 0: the method name;
     * - 1: the method parameters, separated by commas;
     */
    let methodList: any[] = [
      ["format", null],
      ["validate", null]
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
