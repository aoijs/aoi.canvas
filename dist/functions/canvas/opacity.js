"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
exports.default = new __1.AoiFunction({
    name: "$opacity",
    description: "Gets or sets the opacity in the canvas.",
    params: [
        {
            name: "canvas",
            description: "The name of the canvas to get or set the opacity in.",
            type: __1.ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof __1.CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found."
        },
        {
            name: "value",
            description: "New value.",
            type: __1.ParamType.Number,
            typename: "Percentages",
            check: (x) => x / 100 >= 0 && x / 100 <= 1,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [name, value] = ctx.params;
        const canvas = name
            ? ctx.data.canvasManager?.get(name)?.ctx
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof __1.CanvasBuilder
                ? ctx.data.canvas[ctx.data.canvas.length - 1].ctx : null;
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas.");
        if ((value ?? null) !== null)
            canvas.globalAlpha = value / 100;
        else
            data.result = Math.round(canvas.globalAlpha * 100);
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=opacity.js.map