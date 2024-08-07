"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
exports.default = new classes_1.AoiFunction({
    name: "$putPixelsColors",
    description: "Places the pixel colors in the canvas.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas to place the pixels in.",
            type: classes_1.ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof classes_1.CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "x",
            description: "The X coordinate at which to place the pixel colors in the canvas.",
            type: classes_1.ParamType.Number
        },
        {
            name: "y",
            description: "The Y coordinate at which to place the pixel colors in the canvas.",
            type: classes_1.ParamType.Number
        },
        {
            name: "width",
            description: "Width of the rectangle to be painted.",
            type: classes_1.ParamType.Number
        },
        {
            name: "height",
            description: "Height of the rectangle to be painted.",
            type: classes_1.ParamType.Number
        },
        {
            name: "pixels",
            description: "The pixel colors.",
            type: classes_1.ParamType.Array
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        let [name, x, y, width, height, pixels] = ctx.params;
        const canvas = name
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof classes_1.CanvasBuilder
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to place the pixels in.");
        await canvas.setPixelsColors(x, y, width, height, pixels);
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=putPixelsColors.js.map