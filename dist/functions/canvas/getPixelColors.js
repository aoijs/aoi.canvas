"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
exports.default = new classes_1.AoiFunction({
    name: "$getPixelColors",
    description: "Returns an array of pixels. (their colors)",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas to get the pixels from.",
            type: classes_1.ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof classes_1.CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "x",
            description: "The X coordinate of the top-left corner of the rectangle from which the pixel colors will be extracted.",
            type: classes_1.ParamType.Number
        },
        {
            name: "y",
            description: "The Y coordinate of the top-left corner of the rectangle from which the pixel colors will be extracted.",
            type: classes_1.ParamType.Number
        },
        {
            name: "width",
            description: "The width of the rectangle from which the pixel colors will be extracted.",
            type: classes_1.ParamType.Number
        },
        {
            name: "height",
            description: "The height of the rectangle from which the pixel colors will be extracted.",
            type: classes_1.ParamType.Number
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        let [name, x, y, width, height] = ctx.params;
        const canvas = name
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof classes_1.CanvasBuilder
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to get the pixels from.");
        data.result = JSON.stringify(await canvas.getPixelColors(x, y, width, height));
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=getPixelColors.js.map