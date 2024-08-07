/// <reference types="node" />
import { SKRSContext2D, Image } from "@napi-rs/canvas";
import { CanvasUtil } from "./util";
export declare enum textAlign {
    start = "end",
    right = "left",
    center = "center",
    left = "right",
    end = "start"
}
export declare enum MeasureTextProperty {
    actualBoundingBoxAscent = 0,
    actualBoundingBoxDescent = 1,
    actualBoundingBoxLeft = 2,
    actualBoundingBoxRight = 3,
    fontBoundingBoxAscent = 4,
    fontBoundingBoxDescent = 5,
    alphabeticBaseline = 6,
    emHeightAscent = 7,
    emHeightDescent = 8,
    width = 9
}
export declare enum FilterMethod {
    add = 0,
    set = 1,
    remove = 2,
    clear = 3,
    get = 4,
    parse = 5
}
export declare enum GradientType {
    linear = 0,
    radial = 1,
    conic = 2
}
export declare enum GetOrSet {
    get = 0,
    set = 1
}
export declare enum WidthOrHeight {
    width = 0,
    height = 1
}
export declare enum Filters {
    none = 0,
    blur = 1,
    sepia = 2,
    grayscale = 3,
    brightness = 4,
    contrast = 5,
    invert = 6,
    saturate = 7
}
export declare enum textBaseline {
    top = 0,
    hanging = 1,
    middle = 2,
    alphabetic = 3,
    ideographic = 4,
    bottom = 5
}
export declare enum fillRule {
    nonzero = 0,
    evenodd = 1
}
export type RepeatType = "repeat" | "repeat-x" | "repeat-y" | "no-repeat" | null;
export declare class CanvasBuilder {
    ctx: SKRSContext2D;
    util: typeof CanvasUtil;
    constructor(width: number, height: number);
    drawImage: (image: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL, x: number, y: number, width?: number, height?: number, radius?: number | number[]) => Promise<void>;
    fillText: (text: string, x: number, y: number, font: string, maxWidth?: number, multiline?: boolean, wrap?: boolean, lineOffset?: number) => void;
    strokeText: (text: string, x: number, y: number, font: string, width?: number, maxWidth?: number, multiline?: boolean, wrap?: boolean, lineOffset?: number) => void;
    fillRect: (x: number, y: number, width?: number, height?: number, radius?: number | number[]) => void;
    strokeRect: (x: number, y: number, width?: number, height?: number, strokeWidth?: number, radius?: number | number[]) => void;
    clearRect: (x: number, y: number, width?: number, height?: number, radius?: number[]) => void;
    drawLines: (lines: string[]) => void;
    measureText: (text: string, font: string) => TextMetrics;
    filter: (method: FilterMethod, filter?: Filters, value?: number) => string | {
        filter: string;
        value: string;
        raw: string;
    }[] | undefined;
    setShadow: (blur: number, color: string, offset?: number | number[]) => void;
    rotate: (angle: number) => void;
    trim: () => void;
    getPixelColors: (x: number, y: number, width: number, height: number) => Promise<string[]>;
    setPixelsColors: (x: number, y: number, width: number, height: number, colors: string[]) => Promise<void>;
    resize: (width: number, height: number) => Promise<void>;
    render: () => Buffer;
}
//# sourceMappingURL=builder.d.ts.map