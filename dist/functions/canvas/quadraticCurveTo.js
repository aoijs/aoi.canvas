"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
exports.default = new __1.AoiFunction({
    name: "$quadraticCurveTo",
    description: "Adds a quadratic bezier curve to the currect path.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas.",
            type: __1.ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof __1.CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "startX",
            description: "The X coordinate of the start point.",
            type: __1.ParamType.Number
        },
        {
            name: "startY",
            description: "The Y coordinate of the start point.",
            type: __1.ParamType.Number
        },
        {
            name: "endX",
            description: "The X coordinate of the end point.",
            type: __1.ParamType.Number
        },
        {
            name: "endY",
            description: "The Y coordinate of the end point.",
            type: __1.ParamType.Number
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [name, cX, cY, endX, endY] = ctx.params;
        const canvas = name
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof __1.CanvasBuilder
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to draw the curve on.");
        await canvas.ctx.quadraticCurveTo(cX, cY, endX, endY);
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=quadraticCurveTo.js.map