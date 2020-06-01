/**
 * core/Types
 * ----------------------------------------------------------------------
 * Type signatures for objects on the library.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.1.0
 */

/**
 * Type signature to use for interceptor methods.
 *
 * It receives data and spits out modified data in any format.
 */
export type Interceptor = (data: any) => any;

/**
 * Represents an enumerator item.
 */
export type EnumObject = {
  [key: string]: number
};

/**
 * Describes what type of object `ListObject` should store.
 */
export type ListObjectItem = {
  id: number,
  name: string,
  slug: string,
  [key: string]: any
};

/**
 * Describes what type of object an `AbstractList` type of object should 
 * receive when instantiated.
 */
export type ListObject = {
  [key: string]: ListObjectItem
};

/**
 * Represents an endpoint to use when using `AbstractRequestHandler`.
 */
export type RequestEndpoint = {
  url: string,
  method: string[],
  required?: string[]
};

/**
 * Represents a string/string hash object.
 */
export type StringHash = {
  [key: string]: string
};

/**
 * Generic object to use when returning a JSON/POJO object.
 */
export type JsonObject = {
  [key: string]: any
};
