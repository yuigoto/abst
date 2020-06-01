import { HashMap } from "./HashMap";

/**
 * interface/RequestEndpoint
 * ----------------------------------------------------------------------
 * Describes an endpoint object, used on `AbstractRequestHandler`.
 *
 * @since 0.2.0
 */
export interface RequestEndpoint {
  /**
   * Endpoint path.
   */
  url: string;

  /**
   * Stores all HTTP methods accepted on this endpoint.
   */
  method: string[];

  /**
   * Lists all of the endpoint's required fields.
   */
  required?: string[];

  /**
   * Stores key/value pairs of the fields accepted on this endpoint and the
   * type of the value it accepts.
   */
  fields?: HashMap<string>;
}
