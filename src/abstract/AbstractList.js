import { AbstractSingleton } from "./AbstractSingleton";

/**
 * Core/Abstract/AbstractList
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
 * Being an `Abstract` class, it can't be directly instantiated.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export class AbstractList extends AbstractSingleton {
  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Constructor.
   *
   * @param {Object} listObject
   *     Hashmap-like object with items for the list
   */
  constructor (listObject) {
    super();

    let constructorName = this.constructor.name;
    if (this.constructor.name === "AbstractList") {
      throw new TypeError(
        `Abstract class '${constructorName}' cannot be instantiated on its own.`
      );
    }

    // Adds items
    if (Object.keys(this).length === 0) {
      for (let key of Object.keys(listObject)) {
        let curr = listObject[key],
            exists = Object.values(this).filter((item) => {
              return (
                item.id === curr.id
                || item.name === curr.name
                || item.slug === curr.slug
              );
            });

        // Validate base properties
        if (
          !curr.hasOwnProperty("id")
          || !curr.hasOwnProperty("name")
          || !curr.hasOwnProperty("slug")
        ) {
          throw new TypeError(
            `'${constructorName}' items must have an 'id', 'name' and 'slug' properties.`
          );
        }

        // MUST BE DISTINCT
        if (this[key] !== undefined && exists.length > 0) {
          throw new TypeError(
            `'${constructorName}' items must be distinct.`
          );
        }

        this[key] = curr;
      }
    }
  }

  // Public Methods
  // --------------------------------------------------------------------

  /**
   * Returns the `id` of the object by its `key`.
   *
   * @param {String} value
   *     Key associated with the object
   * @returns {Number}
   */
  getIdByKey (value) {
    return this._getBy("id", "key", value);
  }

  /**
   * Returns the `id` of the object by its `name`.
   *
   * @param {String} value
   *     Object name
   * @returns {Number}
   */
  getIdByName (value) {
    return this._getBy("id", "name", value);
  }

  /**
   * Returns the `id` of the object by its `slug`.
   *
   * @param {String} value
   *     Object slug
   * @returns {Number}
   */
  getIdBySlug (value) {
    return this._getBy("id", "slug", value);
  }

  /**
   * Returns the `name` of the object by its `id`.
   *
   * @param {String|Number} value
   *     Object ID
   * @returns {String}
   */
  getNameById (value) {
    value = (typeof value === "string") ? parseInt(value) : value;
    return this._getBy("name", "id", value);
  }

  /**
   * Returns the `name` of the object by its `slug`.
   *
   * @param {String} value
   *     Object slug
   * @returns {String}
   */
  getNameBySlug (value) {
    return this._getBy("name", "slug", value);
  }

  /**
   * Returns the `name` of the object by its `key`.
   *
   * @param {String} value
   *     Key associated with the object
   * @returns {String}
   */
  getNameByKey (value) {
    return this._getBy("name", "key", value);
  }

  /**
   * Returns the `slug` of the object by its `id`.
   *
   * @param {String|Number} value
   *     Object ID
   * @returns {String}
   */
  getSlugById (value) {
    value = (typeof value === "string") ? parseInt(value) : value;
    return this._getBy("slug", "id", value);
  }

  /**
   * Returns the `slug` of the object by its `name`.
   *
   * @param {String} value
   *     Object name
   * @returns {String}
   */
  getSlugByName (value) {
    return this._getBy("slug", "name", value);
  }

  /**
   * Returns the `slug` of the object by its `key`.
   *
   * @param {String} value
   *     Key associated with the object
   * @returns {String}
   */
  getSlugByKey (value) {
    return this._getBy("slug", "key", value);
  }

  /**
   * Returns the `key` associated with the object by its `id`.
   *
   * @param {String|Number} value
   *     Object ID
   * @returns {String}
   */
  getKeyById (value) {
    value = (typeof value === "string") ? parseInt(value) : value;
    return this._getBy("key", "id", value);
  }

  /**
   * Returns the `key` associated with the object by its `name`.
   *
   * @param {String} value
   *     Object name
   * @returns {String}
   */
  getKeyByName (value) {
    return this._getBy("key", "name", value);
  }

  /**
   * Returns the `key` associated with the object by its `slug`.
   *
   * @param {String} value
   *     Object slug
   * @returns {String}
   */
  getKeyBySlug (value) {
    return this._getBy("key", "slug", value);
  }

  /**
   * Returns the `object` itself by its `id`.
   *
   * @param {String} value
   *     Object id
   * @returns {Object}
   */
  getObjectById (value) {
    return this._getBy("object", "id", value);
  }

  /**
   * Returns the `object` itself by its `name`.
   *
   * @param {String} value
   *     Object name
   * @returns {Object}
   */
  getObjectByName (value) {
    return this._getBy("object", "name", value);
  }

  /**
   * Returns the `object` itself by its `slug`.
   *
   * @param {String} value
   *     Object slug
   * @returns {Object}
   */
  getObjectBySlug (value) {
    return this._getBy("object", "slug", value);
  }

  /**
   * Returns the `object` itself by its `key`.
   *
   * @param {String} value
   *     Key associated with the object
   * @returns {Object}
   */
  getObjectByKey (value) {
    return this._getBy("object", "key", value);
  }

  /**
   * Returns a POJO from this class' instance, overriding the default
   * `toJSON()` method.
   *
   * @returns {Object}
   */
  toJSON () {
    let returnable = {};

    let keys = Object.keys(this);
    for (let k = 0; k < keys.length; k++) {
      if (this[keys[k]] !== undefined) {
        returnable[keys[k]] = this[keys[k]];
      }
    }

    return returnable;
  }

  /**
   * Overrides the base method for string conversion.
   *
   * @returns {String}
   */
  toString () {
    return `[object ${this.constructor.name}]`;
  }

  // Private Methods
  // --------------------------------------------------------------------

  /**
   * Genetic, catch-all, method used to return values from the list. All
   * other methods use this one.
   *
   * Basically, it does a `Find X by the value of Y = Z`.
   *
   * The values what can be returned are:
   * - The object's `id`, `name` or `slug` properties;
   * - The object's associated `key` string;
   * - The whole `object` from the list;
   *
   * For comparing values, you can use the same arguments as `get`, save
   * for `object`.
   *
   * @param {String} get
   *     Which data should we return from the list item
   * @param {String} by
   *     Which data should we compare to when selecting
   * @param {String|Number} compare
   *     Value to check when comparing
   * @returns {String|Object|Number|Boolean}
   * @private
   */
  _getBy(get, by, compare) {
    let keys = Object.keys(this);

    for (let k in keys) {
      let key = keys[k],
        obj = this[key],
        should = false;

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
