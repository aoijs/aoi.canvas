"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const classes_1 = require("../../classes");
exports.default = new classes_1.AoiFunction({
    name: "$downloadCanvas",
    description: "Downloads the canvas.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas to download.",
            type: classes_1.ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof classes_1.CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "path",
            description: "The download path. (file name and extension)",
            type: classes_1.ParamType.String,
            typename: "Path"
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        let [name, path = "{canvas}.png"] = ctx.params;
        const canvas = name
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof classes_1.CanvasBuilder
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to download.");
        await (0, node_fs_1.writeFileSync)((0, node_path_1.join)(process.cwd(), path?.replace(/{canvas}/g, canvas)), canvas.render());
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=downloadCanvas.js.map