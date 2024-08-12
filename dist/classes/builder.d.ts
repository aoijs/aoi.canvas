/// <reference types="node" />
import { SKRSContext2D, Image } from '@napi-rs/canvas';
import { CanvasUtil } from './util';
import { FillOrStrokeOrClear, FilterMethod, Filters } from '../typings';
export declare class CanvasBuilder {
    ctx: SKRSContext2D;
    util: typeof CanvasUtil;
    readonly width: number;
    readonly height: number;
    constructor(width: number, height: number);
    rect(type: FillOrStrokeOrClear.none | FillOrStrokeOrClear.fill | FillOrStrokeOrClear, x: number, y: number, width?: number, height?: number, radius?: number | number[]): void;
    rect(type: FillOrStrokeOrClear.stroke, x: number, y: number, width?: number, height?: number, lineWidth?: number, radius?: number | number[]): void;
    text(type: FillOrStrokeOrClear.fill, text: string, x: number, y: number, font: string, maxWidth?: number, multiline?: boolean, wrap?: boolean, lineOffset?: number): void;
    text(type: FillOrStrokeOrClear.stroke, text: string, x: number, y: number, font: string, strokeWidth?: number, maxWidth?: number, multiline?: boolean, wrap?: boolean, lineOffset?: number): void;
    drawImage(image: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL, x: number, y: number, width?: number, height?: number, radius?: number | number[]): Promise<void>;
    measureText(text: string, font: string): TextMetrics;
    filter(method: FilterMethod, filter?: Filters, value?: number): string | {
        filter: string;
        value: string;
        raw: string;
    }[] | undefined;
    setShadow(blur: number, color: string, offset?: number | number[]): void;
    rotate(angle: number): void;
    trim(): void;
    getPixelColors(x: number, y: number, width: number, height: number): string[];
    setPixelsColors(x: number, y: number, width: number, height: number, colors: string[]): void;
    resize(width: number, height: number): void;
    get buffer(): Buffer;
}
//# sourceMappingURL=builder.d.ts.map