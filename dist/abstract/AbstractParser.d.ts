export declare abstract class AbstractParser {
    [key: string]: any;
    protected _input: any;
    constructor(input?: any);
    get input(): any;
    set input(value: any);
    abstract parse(): any;
    toString(): string;
}
