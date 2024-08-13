import { AoiClient } from 'aoi.js';
import { FunctionData } from '../typings';
export declare class AoiFunction<T extends "aoi.js" | "djs"> {
    data: FunctionData<T>;
    constructor(data: FunctionData<T>);
    register(client: AoiClient): void;
    get(): {
        name: string;
        description: string | undefined;
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