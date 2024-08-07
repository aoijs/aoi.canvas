import { AoiClient, Util, AoiError } from "aoi.js";
import { AttachmentBuilder, BaseChannel, CommandInteraction } from "discord.js";
import { CanvasBuilder, CanvasManager, GIFManager, GradientManager } from "./classes";
declare const gifencoder: any;
export declare const log: (content: string, type?: "log" | "warn" | "error") => void;
export interface AoiD {
    error: Function;
    interpreter: Function;
    client: AoiClient;
    channel: BaseChannel;
    aoiError: typeof AoiError;
    data: {
        canvasManager?: CanvasManager;
        gifManager?: GIFManager;
        gradients?: GradientManager;
        canvas?: CanvasBuilder[];
        gif?: typeof gifencoder[];
        colorStops?: [number, string][];
        interaction: CommandInteraction;
    };
    files: AttachmentBuilder[];
    util: typeof Util;
}
export declare class AoiCanvas {
    constructor(client: AoiClient);
}
export {};
//# sourceMappingURL=index.d.ts.map