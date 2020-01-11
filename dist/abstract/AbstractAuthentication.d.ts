export declare abstract class AbstractAuthentication {
    constructor();
    abstract authenticate(user: any): any;
    abstract logout(): any;
    abstract status(): any;
    toString(): string;
}
