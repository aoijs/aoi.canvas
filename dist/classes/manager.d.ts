import { CanvasBuilder } from "./builder";
export declare class CanvasManager {
    canvases: Map<string, CanvasBuilder>;
    constructor();
    create: (name: string, width: number, height: number) => void;
    remove: (name: string) => void;
    set: (name: string, canvas: CanvasBuilder) => void;
    get: (name: string) => CanvasBuilder | undefined;
    all: () => Map<string, CanvasBuilder>;
}
//# sourceMappingURL=manager.d.ts.map