import { JsonObject } from "../core/Types";

export abstract class AbstractValidation {
  /**
   * Input value for validation.
   */
  protected _input: any = null;
  
  constructor (input: any) {
    let name: String = (this.constructor as typeof AbstractValidation).name;
    if (name === "AbstractValidation") {
      throw new TypeError(
        `Abstract class '${name}' cannot be instantiated on its own.`
      );
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
