import { HashMap } from "./HashMap";

/**
 * interface/ListObjectItem
 * ----------------------------------------------------------------------
 * Describes what type of object a `ListObject` should store.
 *
 * @since 0.2.0
 */
export interface ListObjectItem extends HashMap<any> {
  id: number;
  name: string;
  slug: string;
}
