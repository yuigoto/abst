import { Interceptor, RequestEndpoint, StringHash } from "../core/Types";
export declare abstract class AbstractRequestHandler {
    protected _baseUrl: string;
    protected _headers: StringHash;
    protected _dataInterceptors: Interceptor[];
    protected _errorInterceptors: Interceptor[];
    protected _resultInterceptors: Interceptor[];
    constructor(baseUrl: string);
    get baseUrl(): string;
    set baseUrl(value: string);
    get headers(): StringHash;
    set headers(value: StringHash);
    get dataInterceptors(): Interceptor[];
    set dataInterceptors(value: Interceptor[]);
    get errorInterceptors(): Interceptor[];
    set errorInterceptors(value: Interceptor[]);
    get resultInterceptors(): Interceptor[];
    set resultInterceptors(value: Interceptor[]);
    abstract request(endpoint: RequestEndpoint, data: any, method: string, headers?: StringHash): Promise<any>;
    abstract requestUrl(url: string, data: any, method: string, headers?: StringHash): Promise<any>;
    addDataInterceptor(interceptor: Interceptor): number | boolean;
    applyDataInterceptors(data: any): any;
    removeDataInterceptor(index: number): boolean;
    clearDataInterceptors(): this;
    addErrorInterceptor(interceptor: Interceptor): number | boolean;
    applyErrorInterceptors(data: any): any;
    removeErrorInterceptor(index: number): boolean;
    clearErrorInterceptors(): this;
    addResultInterceptor(interceptor: Interceptor): number | boolean;
    applyResultInterceptors(data: any): any;
    removeResultInterceptor(index: number): boolean;
    clearResultInterceptors(): this;
    addHeader(key: string, value: any): AbstractRequestHandler;
    clearHeaders(): AbstractRequestHandler;
    removeHeader(key: string): this;
    isMethodValid(method: string): boolean;
    isValidEndpoint(input: any): boolean;
    trimSlashes(input: string): string;
    toString(): string;
    protected setBaseUrl(url: string): void;
}
