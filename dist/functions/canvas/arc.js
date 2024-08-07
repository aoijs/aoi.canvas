"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
exports.default = new classes_1.AoiFunction({
    name: "$arc",
    description: "Draws a circular arc in the current path.",
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
            name: "x",
            description: "The X coordinate of the arc's center.",
            type: classes_1.ParamType.Number
        },
        {
            name: "y",
            description: "The Y coordinate of the arc's center.",
            type: classes_1.ParamType.Number
        },
        {
            name: "radius",
            description: "The arc's radius",
            type: classes_1.ParamType.Number,
            check: (x) => x >= 0,
            checkError: () => "The radius must be positive."
        },
        {
            name: "startAngle",
            description: "The angle at which the arc starts in radians, measured from the positive x-axis.",
            type: classes_1.ParamType.Number
        },
        {
            name: "endAngle",
            description: "The angle at which the arc ends in radians, measured from the positive x-axis.",
            type: classes_1.ParamType.Number
        },
        {
            name: "counterclockwise",
            description: "If true, draws the arc counter-clockwise between the start and end angles.",
            type: classes_1.ParamType.Boolean,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [name, x, y, radius, sAngle, eAngle, cclockwise] = ctx.params;
        const canvas = name
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof classes_1.CanvasBuilder
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to draw a circular arc in.");
        canvas.ctx.arc(x, y, radius, sAngle, eAngle, cclockwise);
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=arc.js.map