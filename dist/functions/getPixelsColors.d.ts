import { CanvasManager } from "../classes";
import { AoiD } from "../index";
declare const _default: {
    name: string;
    code: (d: AoiD) => Promise<void | {
        code: string;
        data: {
            canvases: CanvasManager;
            interaction: import("discord.js").CommandInteraction<import("discord.js").CacheType>;
        };
    }>;
};
export default _default;
//# sourceMappingURL=getPixelsColors.d.ts.map