import { Extendable } from "core/Interfaces";
export declare abstract class AbstractSingleton implements Extendable {
    [key: string]: any;
    private static _instance;
    protected constructor();
    toString(): string;
}
