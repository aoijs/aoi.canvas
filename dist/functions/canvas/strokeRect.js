"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
exports.default = new classes_1.AoiFunction({
    name: "$strokeRect",
    description: "Draws a stroked (outlined) rectangle.",
    params: [
        {
            name: "canvas",
            description: "The canvas name to draw rect on.",
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof classes_1.CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            type: classes_1.ParamType.String,
            optional: true
        },
        {
            name: "x",
            description: "The rect start X coordinate.",
            type: classes_1.ParamType.Number
        },
        {
            name: "y",
            description: "The rect start Y coordinate.",
            type: classes_1.ParamType.Number
        },
        {
            name: "width",
            description: "The rect width.",
            type: classes_1.ParamType.Number
        },
        {
            name: "height",
            description: "The rect height.",
            type: classes_1.ParamType.Number
        },
        {
            name: "strokeWidth",
            description: "The stroke (outline) width.",
            type: classes_1.ParamType.Number,
            optional: true
        },
        {
            name: "radius",
            description: "The rect corners radius.",
            type: classes_1.ParamType.Number,
            check: (x) => !!(x >= 0),
            checkError: () => "Radius must be positive.",
            rest: true,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        let [name, x, y, width, height, strokeWidth = 1, radius] = ctx.params;
        const canvas = name
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof classes_1.CanvasBuilder
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to draw a stroked rectangle in.");
        await canvas.strokeRect(x, y, width, height, strokeWidth, radius && radius.length === 1 ? radius[0] : radius);
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=strokeRect.js.map