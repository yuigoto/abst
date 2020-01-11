import { AbstractSingleton } from "abstract/AbstractSingleton";
import { ListObject, ListObjectItem, JsonObject } from "core/Types";
export declare abstract class AbstractList extends AbstractSingleton {
    constructor(listObject: ListObject);
    getIdByKey(value: string): number;
    getIdByName(value: string): number;
    getIdBySlug(value: string): number;
    getNameById(value: number): string;
    getNameBySlug(value: string): string;
    getNameByKey(value: string): string;
    getSlugById(value: number): string;
    getSlugByName(value: string): string;
    getSlugByKey(value: string): string;
    getKeyById(value: number): string;
    getKeyByName(value: string): string;
    getKeyBySlug(value: string): string;
    getObjectById(value: number): ListObjectItem;
    getObjectByName(value: string): ListObjectItem;
    getObjectBySlug(value: string): ListObjectItem;
    getObjectByKey(value: string): ListObjectItem;
    toJSON(): JsonObject;
    toString(): string;
    protected getBy(get: string, by: string, compare: any): string | number | boolean | ListObjectItem;
}
