import { CanvasManager } from "../classes";
import { AoiD } from "../index";
declare const _default: {
    name: string;
    code: (d: AoiD) => Promise<void | {
        code: string;
        data: {
            canvases: CanvasManager;
            interaction: import("discord.js").CommandInteraction;
        };
    }>;
};
export default _default;
//# sourceMappingURL=fillText.d.ts.map