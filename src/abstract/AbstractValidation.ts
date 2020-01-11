import { JsonObject } from "../core/Types";

/**
 * abstract/AbstractValidation
 * ----------------------------------------------------------------------
 * Implements a basic interface for a validator-type class.
 *
 * Validates a single input at a time.
 *
 * Being an `Abstract` class, it can't (or shouldn't) be directly instantiated.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export abstract class AbstractValidation {
  /**
   * Class index signature, so we won't have any implicitAny errors.
   */
  [key: string]: any;
  
  // PROTECTED PROPERTIES
  // --------------------------------------------------------------------
  
  /**
   * Input value for validation.
   */
  protected _input: any = null;
  
  // LIFECYCLE
  // --------------------------------------------------------------------
  
  /**
   * Constructor.
   * 
   * @param input 
   *     Input for validation
   */
  constructor (input: any) {
    let name: String = (this.constructor as typeof AbstractValidation).name;
    if (name === "AbstractValidation") {
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
      ["validate", null],
      ["message", null]
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
  }

  // GETTERS + SETTERS
  // --------------------------------------------------------------------
  
  /**
   * Input value for validation.
   */
  get input (): any {
    return this._input;
  }
  
  set input (value: any) {
    this._input = value;
  }

  // PUBLIC METHODS
  // --------------------------------------------------------------------
  
  /**
   * Returns some validation message set by `validate` for the value in `input`.
   */
  public abstract message (): string;
  
  /**
   * Validates `input` and returns the status.
   */
  public abstract validate (): boolean;

  /**
   * Returns a POJO from this class' instance, overriding the default
   * `toJSON()` method.
   *
   * @returns {Object}
   */
  public toJSON (): JsonObject {
    let validation = (this.hasOwnProperty("validate")) 
          ? this["validate"]() : false,
        message = (this.hasOwnProperty("message"))
          ? this["message"]() : "";
    
    return {
      value: this.input || "",
      message: message || "",
      validation: validation || false
    };
  }

  /**
   * Returns a string representation of an object, overrides default method.
   */
  public toString (): string {
    return `[object ${this.constructor.name}]`;
  }
}
