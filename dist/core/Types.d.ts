export declare type Interceptor = (data: any) => any;
export declare type EnumObject = {
    [key: string]: number;
};
export declare type ListObjectItem = {
    id: number;
    name: string;
    slug: string;
    [key: string]: any;
};
export declare type ListObject = {
    [key: string]: ListObjectItem;
};
export declare type RequestEndpoint = {
    url: string;
    method: string[];
    required?: string[];
};
export declare type StringHash = {
    [key: string]: string;
};
export declare type JsonObject = {
    [key: string]: any;
};
