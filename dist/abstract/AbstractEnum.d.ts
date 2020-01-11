import { EnumObject } from "core/Types";
import { AbstractSingleton } from "abstract/AbstractSingleton";
export declare abstract class AbstractEnum extends AbstractSingleton {
    constructor(enumerator: EnumObject);
    get(value: number): string;
    getKeys(): string[];
    getValues(): number[];
    toJSON(): EnumObject;
    toString(): string;
    private isValidValue;
}
