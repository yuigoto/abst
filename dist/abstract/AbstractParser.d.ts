export declare abstract class AbstractParser {
    protected _input: any;
    constructor(input?: any);
    get input(): any;
    set input(value: any);
    abstract parse(): any;
    toString(): string;
}
