"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
exports.default = new classes_1.AoiFunction({
    name: "$lineTo",
    description: "Adds a straight line to the current path.",
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
            description: "The X coordinate of the line's end point.",
            type: classes_1.ParamType.Number
        },
        {
            name: "y",
            description: "The Y coordinate of the line's end point.",
            type: classes_1.ParamType.Number
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        let [name, x, y] = ctx.params;
        const canvas = name
            ? ctx.data.canvasManager?.get(name)?.ctx
            : !name && ctx.data.canvas && ctx.data.canvas instanceof classes_1.CanvasBuilder
                ? ctx.data.canvas.ctx : null;
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas.");
        canvas.lineTo(x, y);
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=lineTo.js.map