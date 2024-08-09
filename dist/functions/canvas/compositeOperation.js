"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
exports.default = new __1.AoiFunction({
    name: "$compositeOperation",
    description: "Sets the type of compositing operation to apply when drawing new shapes.",
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
            name: "operation",
            description: "The new compositing operation.",
            type: __1.ParamType.Enum,
            typename: 'CompositingOperation',
            enum: __1.compositingOperation,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        let [name, operation] = ctx.params;
        const canvas = name
            ? ctx.data.canvasManager?.get(name)?.ctx
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof __1.CanvasBuilder
                ? ctx.data.canvas[ctx.data.canvas.length - 1].ctx : null;
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas.");
        if (operation !== null && operation !== undefined)
            canvas.globalCompositeOperation = typeof operation === "number" ? __1.compositingOperation[operation] : operation;
        else
            data.result = canvas.globalCompositeOperation;
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=compositeOperation.js.map