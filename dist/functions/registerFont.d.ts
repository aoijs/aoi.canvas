import { AoiD } from "../index";
declare const _default: {
    name: string;
    info: {
        description: string;
        parameters: {
            name: string;
            description: string;
            type: string;
            required: boolean;
        }[];
        examples: never[];
    };
    code: (d: AoiD) => Promise<void | {
        code: string;
        data: {
            canvases: import("../classes").CanvasManager;
            interaction: import("discord.js").CommandInteraction<import("discord.js").CacheType>;
        };
    }>;
};
export default _default;
//# sourceMappingURL=registerFont.d.ts.map