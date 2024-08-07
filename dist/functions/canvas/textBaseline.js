"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
exports.default = new classes_1.AoiFunction({
    name: "$textBaseline",
    description: "Sets the text baseline in the canvas.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas to set the text baseline in.",
            type: classes_1.ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof classes_1.CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "baseline",
            description: "The text baseline.",
            type: classes_1.ParamType.Enum,
            enum: classes_1.textBaseline
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        let [name, baseline] = ctx.params;
        const canvas = name
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof classes_1.CanvasBuilder
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to set the text baseline in.");
        if (typeof baseline === "string")
            baseline = classes_1.textBaseline[baseline];
        canvas.ctx.textBaseline = classes_1.textBaseline[baseline];
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=textBaseline.js.map