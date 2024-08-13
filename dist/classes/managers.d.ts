import { CanvasBuilder, GradientType } from '../';
declare const gifencoder: any;
export declare class Manager<T extends any> {
    map: Map<string, T>;
    constructor();
    remove: (name: string) => boolean;
    set: (name: string, value: T) => Map<string, T>;
    get: (name: string) => T | undefined;
    all: () => Map<string, T>;
}
export declare class CanvasManager extends Manager<CanvasBuilder> {
    create: (name: string, width: number, height: number) => Map<string, CanvasBuilder>;
}
export declare class GradientManager extends Manager<CanvasGradient> {
    private ctx;
    constructor();
    create: (name: string, type: GradientType, options: number[]) => Map<string, CanvasGradient>;
}
export declare class GIFManager extends Manager<typeof gifencoder> {
    create: (name: string, width: number, height: number, algorithm?: "neuquant" | "octree") => Map<string, any>;
}
export {};
//# sourceMappingURL=managers.d.ts.map