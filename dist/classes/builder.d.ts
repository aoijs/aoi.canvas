/// <reference types="node" />
import { SKRSContext2D, Image } from '@napi-rs/canvas';
import { CanvasUtil } from './util';
import { FilterMethod, Filters } from '../typings';
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