/// <reference types="node" />
import { SKRSContext2D, Image } from "@napi-rs/canvas";
import { CanvasUtil } from "./util";
export declare const Filters: string[];
export type RepeatType = "repeat" | "repeat-x" | "repeat-y" | "no-repeat" | null;
export declare class CanvasBuilder {
    static ctx: SKRSContext2D;
    static gradients: Map<string, CanvasGradient>;
    util: typeof CanvasUtil;
    constructor(width: number, height: number);
    drawImage: (image: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL, x: number, y: number, width?: number, height?: number, radius?: number | number[]) => Promise<void>;
    fillText: (text: string, x: number, y: number, font: string, color: string | CanvasGradient, maxWidth?: number, textAlign?: string, textBaseline?: string) => void;
    strokeText: (text: string, x: number, y: number, font: string, color: string | CanvasGradient, lineWidth?: number, maxWidth?: number, textAlign?: string, textBaseline?: string) => void;
    fillRect: (style: string | CanvasGradient | CanvasPattern, x: number, y: number, width?: number, height?: number, radius?: number | number[]) => void;
    strokeRect: (style: string | CanvasGradient | CanvasPattern, x: number, y: number, width?: number, height?: number, strokeWidth?: number, radius?: number | number[]) => void;
    clearRect: (x: number, y: number, width?: number, height?: number, radius?: number[]) => void;
    drawLines: (type: number, color: string | CanvasGradient, startX: number, startY: number, lines: string[], strokeWidth?: number) => void;
    measureText: (text: string, font: string) => TextMetrics;
    setTextAlign: (align: string) => void;
    filter: (method: string, name?: string, value?: number) => string | {
        filter: string;
        value: string;
        raw: string;
    }[] | undefined;
    createGradient: (name: string, type: number, options: number[]) => void;
    addColorStop: (gradient: string, offset: number, color: string) => void;
    setShadow: (blur: number, color: string, offset?: number | number[]) => void;
    rotate: (angle: number) => void;
    trim: () => void;
    getContext: () => SKRSContext2D;
    getGradient: (name: string) => CanvasGradient | undefined;
    render: () => Buffer;
}
//# sourceMappingURL=builder.d.ts.map