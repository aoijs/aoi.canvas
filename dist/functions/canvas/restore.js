"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
exports.default = new classes_1.AoiFunction({
    name: "$restore",
    description: "Restores the most recently saved canvas state.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas.",
            type: classes_1.ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof classes_1.CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [name] = ctx.params;
        const canvas = name
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof classes_1.CanvasBuilder
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to restore.");
        await canvas.ctx.restore();
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=restore.js.map