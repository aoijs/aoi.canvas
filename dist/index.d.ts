/// <reference types="node" />
import { AoiClient, Util, AoiError } from "aoi.js";
import { AttachmentBuilder } from "discord.js";
import { CanvasManager } from "./classes";
export interface AoiD {
    aoiError: typeof AoiError;
    data: {
        canvases: CanvasManager;
    };
    files: AttachmentBuilder[];
    util: typeof Util;
}
export declare const FileParser: (input: string, d: AoiD) => Promise<void | AttachmentBuilder[]>;
export declare class AoiCanvas {
    constructor(client: AoiClient);
    registerFonts(...fonts: {
        src: Buffer | string;
        name?: string;
    }[]): void;
}
//# sourceMappingURL=index.d.ts.map