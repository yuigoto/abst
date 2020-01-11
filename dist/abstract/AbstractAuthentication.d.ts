export declare abstract class AbstractAuthentication {
    [key: string]: any;
    constructor();
    abstract authenticate(user: any): any;
    abstract logout(): any;
    abstract status(): any;
    toString(): string;
}
