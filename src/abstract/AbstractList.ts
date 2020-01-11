import { AbstractSingleton } from "../abstract/AbstractSingleton";
import { 
  ListObject, 
  ListObjectItem, 
  JsonObject 
} from "../core/Types";

/**
 * abstract/AbstractList
 * ----------------------------------------------------------------------
 * Sets basic definitions for a data list/dictionary-like object, which
 * works almost the same way as `AbstractEnum`. Instead of numbers, though,
 * this class associates the keys to objects.
 *
 * All you need to do is extend from this class and call `super` with a
 * `listObject`  where each children must have these attributes:
 * - A numeric `id`;
 * - A `name` and a `slug` strings;
 *
 * Additional attributes are optional, main attributes must be DISTINCT.
 *
 * Being an `Abstract` class, it can't (or shouldn't) be directly instantiated.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export abstract class AbstractList extends AbstractSingleton {
  // LIFECYCLE
  // --------------------------------------------------------------------
  
  /**
   * Constructor.
   * 
   * @param listObject 
   *     Hashmap-like object, whose properties will be added to this list 
   */
  constructor (listObject: ListObject) {
    super();
    
    let name: String = (this.constructor as typeof AbstractList).name;
    if (name === "AbstractList") {
      throw new TypeError(
        `Abstract class '${name}' cannot be instantiated on its own.`
      );
    }
    
    let selfKeys: string[] = Object.keys(this),
        selfVals: ListObjectItem[] = Object.keys(this).map((key) => this[key]), 
        listKeys: string[] = Object.keys(listObject);
        
    if (selfKeys.length === 0) {
      for (let key of listKeys) {
        try {
          let curr: ListObjectItem = listObject[key], 
              exists: ListObjectItem[] = selfVals.filter(
                (item: ListObjectItem) => {
                  return (
                    item.id === curr.id 
                      || item.name === curr.name 
                      || item.slug === curr.slug
                  );
                }
              );
              
          if (
            !curr.hasOwnProperty("id") 
              || !curr.hasOwnProperty("name") 
              || !curr.hasOwnProperty("slug") 
          ) {
            throw new TypeError(
              `'${name}' items must have an 'id', 'name' and 'slug' properties.`
            );
          } else {
            
          }
          
          if (
            selfKeys.indexOf(key) > -1 
              || exists.length > 0
          ) {
            throw new TypeError(
              `'${name}' items must have distinct keys and values.`
            );
          }
          
          this[key] = curr;
        
          selfKeys = Object.keys(this);
          selfVals = Object.keys(this).map((key) => this[key]);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  // PUBLIC METHODS
  // --------------------------------------------------------------------
  
  /**
   * Returns the `id` of the object by its `key`.
   * 
   * @param value 
   *     Key associated with the object
   */
  public getIdByKey (value: string): number {
    return this._getBy("id", "key", value);
  }
  
  /**
   * Returns the `id` of the object by its `name`.
   * 
   * @param value 
   *     Object name
   */
  public getIdByName (value: string): number {
    return this._getBy("id", "name", value);
  }
  
  /**
   * Returns the `id` of the object by its `slug`.
   * 
   * @param value 
   *     Object slug
   */
  public getIdBySlug (value: string): number {
    return this._getBy("id", "slug", value);
  }
  
  /**
   * Returns the `name` of the object by its `id`.
   * 
   * @param value 
   *     Object ID
   */
  public getNameById (value: number): string {
    return this._getBy("name", "id", value);
  }
  
  /**
   * Returns the `name` of the object by its `slug`.
   * 
   * @param value 
   *     Object slug
   */
  public getNameBySlug (value: string): string {
    return this._getBy("name", "slug", value);
  }
  
  /**
   * Returns the `name` of the object by its `key`.
   * 
   * @param value 
   *     Key associated with the object
   */
  public getNameByKey (value: string): string {
    return this._getBy("name", "key", value);
  }
  
  /**
   * Returns the `slug` of the object by its `id`.
   * 
   * @param value 
   *     Object ID
   */
  public getSlugById (value: number): string {
    return this._getBy("slug", "id", value);
  }
  
  /**
   * Returns the `slug` of the object by its `name`.
   * 
   * @param value 
   *     Object name
   */
  public getSlugByName (value: string): string {
    return this._getBy("slug", "name", value);
  }
  
  /**
   * Returns the `slug` of the object by its `key`.
   * 
   * @param value 
   *     Key associated with the object
   */
  public getSlugByKey (value: string): string {
    return this._getBy("slug", "key", value);
  }
  
  /**
   * Returns the `key` associated with the object by its `id`.
   * 
   * @param value 
   *     Object ID
   */
  public getKeyById (value: number): string {
    return this._getBy("key", "id", value);
  }
  
  /**
   * Returns the `key` associated with the object by its `name`.
   * 
   * @param value 
   *     Object name
   */
  public getKeyByName (value: string): string {
    return this._getBy("key", "name", value);
  }
  
  /**
   * Returns the `key` associated with the object by its `slug`.
   * 
   * @param value 
   *     Object slug
   */
  public getKeyBySlug (value: string): string {
    return this._getBy("key", "slug", value);
  }
  
  /**
   * Returns the `object` itself by its `id`.
   * 
   * @param value 
   *     Object id
   */
  public getObjectById (value: number): ListObjectItem {
    return this._getBy("object", "id", value);
  }
  
  /**
   * Returns the `object` itself by its `name`.
   * 
   * @param value 
   *     Object name
   */
  public getObjectByName (value: string): ListObjectItem {
    return this._getBy("object", "name", value);
  }
  
  /**
   * Returns the `object` itself by its `slug`.
   * 
   * @param value 
   *     Object slug
   */
  public getObjectBySlug (value: string): ListObjectItem {
    return this._getBy("object", "slug", value);
  }
  
  /**
   * Returns the `object` itself by its `key`.
   * 
   * @param value 
   *     Key associated with the object
   */
  public getObjectByKey (value: string): ListObjectItem {
    return this._getBy("object", "key", value);
  }

  /**
   * Returns a POJO representation of this class' object, this is called when
   * `JSON.stringify` is used on an instance of this class.
   */
  public toJSON (): JsonObject {
    let returnable: JsonObject = {},
        keys: string[] = Object.keys(this);
        
    for (let k = 0; k < keys.length; k++) {
      if (this[keys[k]] !== undefined) returnable[keys[k]] = this[keys[k]];
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
   * Generic catch-all method used to return values from the list. All
   * other methods use this one.
   *
   * Basically, it does a `Find X by the value of Y = Z`.
   *
   * The values what can be returned are:
   * - The object's `id`, `name` or `slug` properties;
   * - The object's associated `key` string;
   * - The whole `object` from the list;
   * 
   * @param get 
   *     Which data should we return from the list item
   * @param by 
   *     Which data should we compare to when selecting
   * @param compare 
   *     Value to check when comparing
   */
  protected getBy(
    get: string, 
    by: string, 
    compare: any
  ): string|number|boolean|ListObjectItem {
    let keys: string[] = Object.keys(this);

    for (let k in keys) {
      let key: string = keys[k],
          obj: ListObjectItem = this[key],
          should: boolean = false;

      if (get === "id") {
        // Returning `id`
        switch (by) {
          case "name": should = (obj.name === compare); break;
          case "slug": should = (obj.slug === compare); break;
          default: should = (key === compare); break;
        }
        if (should === true) return obj.id;
      } else if (get === "name") {
        // Returning `name`
        switch (by) {
          case "id": should = (obj.id === compare); break;
          case "slug": should = (obj.slug === compare); break;
          default: should = (key === compare); break;
        }
        if (should === true) return obj.name;
      } else if (get === "slug") {
        // Returning `slug`
        switch (by) {
          case "id": should = (obj.id === compare); break;
          case "name": should = (obj.name === compare); break;
          default: should = (key === compare); break;
        }
        if (should === true) return obj.slug;
      } else if (get === "key") {
        // Returning the associated `key`
        switch (by) {
          case "id": should = (obj.id === compare); break;
          case "name": should = (obj.name === compare); break;
          case "slug": should = (obj.slug === compare); break;
        }
        if (should === true) return key;
      } else if (get === "object") {
        // Returning the whole object
        switch (by) {
          case "id": should = (obj.id === compare); break;
          case "name": should = (obj.name === compare); break;
          case "slug": should = (obj.slug === compare); break;
          default: should = (key === compare); break;
        }
        if (should === true) return obj;
      }
    }
    return false;
  }
}
