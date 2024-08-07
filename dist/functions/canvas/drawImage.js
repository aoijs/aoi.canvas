"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
const node_fs_1 = require("node:fs");
exports.default = new classes_1.AoiFunction({
    name: "$drawImage",
    description: "Draws an image on the canvas.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas.",
            type: classes_1.ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof classes_1.CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "path",
            description: "Path or url to the image.",
            type: classes_1.ParamType.String,
            typename: "Path | URL | 'canvas:name'",
            check: async (v, c) => c.checkType(c, { type: classes_1.ParamType.Url }, v)
                || await (0, node_fs_1.existsSync)(v)
                || (v?.toLowerCase().startsWith('canvas:')
                    ? (c.data.canvasManager
                        && c.data.canvasManager instanceof classes_1.CanvasManager
                        && c.data.canvasManager.get(v.split(':').slice(1).join())) : undefined),
        },
        {
            name: "x",
            description: "The X coordinate of the image.",
            type: classes_1.ParamType.Number
        },
        {
            name: "y",
            description: "The Y coordinate of the image.",
            type: classes_1.ParamType.Number
        },
        {
            name: "width",
            description: "The image width.",
            type: classes_1.ParamType.Number,
            optional: true
        },
        {
            name: "height",
            description: "The image height.",
            type: classes_1.ParamType.Number,
            optional: true
        },
        {
            name: "radius",
            description: "The image corners radius.",
            type: classes_1.ParamType.Number,
            check: (x) => x >= 0,
            checkError: () => "The radius must be positive.",
            rest: true,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        let [name, path, x, y, width, height, radius] = ctx.params;
        const canvas = name
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof classes_1.CanvasBuilder
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to draw an image on.");
        if (path.toLowerCase().startsWith('canvas:'))
            path = ctx.data.canvasManager?.get(path.split(':').slice(1).join())?.render();
        await canvas.drawImage(path, x, y, width, height, radius);
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=drawImage.js.map