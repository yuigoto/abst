import { JsonObject } from "../core/Types";
export declare abstract class AbstractValidation {
    [key: string]: any;
    protected _input: any;
    constructor(input: any);
    get input(): any;
    set input(value: any);
    abstract message(): string;
    abstract validate(): boolean;
    toJSON(): JsonObject;
    toString(): string;
}
