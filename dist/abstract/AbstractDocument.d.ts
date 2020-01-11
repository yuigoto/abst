import { JsonObject } from "core/Types";
export declare abstract class AbstractDocument {
    protected _input: any;
    protected _length: number;
    constructor(input: any, length: number);
    get input(): any;
    set input(value: any);
    get length(): number;
    set length(value: number);
    abstract validate(): boolean;
    abstract format(): any;
    toJSON(): JsonObject;
    toString(): string;
}
