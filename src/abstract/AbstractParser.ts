/**
 * abstract/AbstractParser
 * ----------------------------------------------------------------------
 * Sets basic definitions for parsers, which can be used to check data for
 * validation and/or as filter.
 *
 * Being an `Abstract` class, it can't (or shouldn't) be directly instantiated.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export abstract class AbstractParser {
  /**
   * Class index signature, so we won't have any implicitAny errors.
   */
  [key: string]: any;
  
  // PRIVATE PROPERTIES
  // --------------------------------------------------------------------

  /**
   * Parser input value.
   */
  protected _input: any = null;

  // LIFECYCLE
  // --------------------------------------------------------------------

  /**
   * Constructor.
   * 
   * @param input 
   *     Input value to parse
   */
  constructor (input?: any) {
    let name: String = (this.constructor as typeof AbstractParser).name;
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
      ["parse", null]
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
   * Parser input value.
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
   * Parses the value on input, returns the parsed value.
   */
  public abstract parse (): any;

  /**
   * Returns a string representation of an object, overrides default method.
   */
  public toString (): string {
    return `[object ${this.constructor.name}]`;
  }
}
