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
    code: (d: AoiD) => Promise<{
        code: string;
        data: {
            canvases: import("../classes").CanvasManager;
        };
    }>;
};
export default _default;
//# sourceMappingURL=fontFamilies.d.ts.map