/// <reference types="node" />
import { AoiClient, Util, AoiError } from "aoi.js";
import { AttachmentBuilder, BaseChannel, CommandInteraction } from "discord.js";
import { CanvasManager } from "./classes";
export interface AoiD {
    error: Function;
    interpreter: Function;
    client: AoiClient;
    channel: BaseChannel;
    aoiError: typeof AoiError;
    data: {
        canvases: CanvasManager;
        interaction: CommandInteraction;
    };
    files: AttachmentBuilder[];
    util: typeof Util;
}
export declare class AoiCanvas {
    constructor(client: AoiClient);
    registerFonts(...fonts: {
        src: Buffer | string;
        name?: string;
    }[]): void;
}
//# sourceMappingURL=index.d.ts.map