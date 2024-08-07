import { AoiClient } from "aoi.js";
import { AoiD } from "..";
export declare enum ParamType {
    String = 0,
    Number = 1,
    Boolean = 2,
    Url = 3,
    Enum = 4,
    Color = 5,
    Object = 6,
    Array = 7,
    JSON = 8,
    User = 9,
    Guild = 10,
    Channel = 11,
    Permission = 12
}
export interface Param {
    name: string;
    description: string;
    type: ParamType;
    typename?: string;
    check?: (value: any, ctx: FunctionContext) => boolean | undefined | null | Promise<boolean | undefined | null>;
    checkError?: (value: any, ctx?: FunctionContext) => string;
    enum?: {
        [i: string | number]: string | number;
    };
    rest?: boolean;
    default?: (ctx: FunctionContext) => any;
    optional?: boolean;
}
export interface FunctionDoc {
    category?: string;
    example?: string;
    src?: string;
    docs?: string;
}
export interface FunctionContext<T = any[]> extends AoiD {
    params: T;
    checkType: (d: AoiD, param: Param, value: string) => any;
}
export interface FunctionData<T extends "aoi.js" | "djs"> {
    name: string;
    description?: string;
    docs?: FunctionDoc;
    params?: Param[];
    code: {
        "djs": (ctx: FunctionContext) => {};
        "aoi.js": string;
    }[T];
}
export declare class AoiFunction<T extends "aoi.js" | "djs"> {
    data: FunctionData<T>;
    constructor(data: FunctionData<T>);
    register(client: AoiClient): void;
    get(): {
        name: string;
        params: {
            name: string;
            description: string;
            type: string;
            required: boolean;
            enum: {
                [i: string]: string | number;
                [i: number]: string | number;
            } | undefined;
        }[];
        usage: string;
        example: string | undefined;
        category: string | undefined;
        src: string | undefined;
        docs: string | undefined;
    };
    get raw(): FunctionData<T>;
}
//# sourceMappingURL=function.d.ts.map