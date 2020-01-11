export declare abstract class AbstractStore {
    constructor();
    abstract get(key: string): any;
    abstract getAll(): any;
    abstract set(key: string, value: any): AbstractStore | void;
    abstract remove(key: string): AbstractStore | void;
    abstract clear(): AbstractStore | void;
    toString(): string;
}
