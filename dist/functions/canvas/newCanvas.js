"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const __2 = require("../../");
exports.default = new __2.AoiFunction({
    name: "$newCanvas",
    description: "Creates a new canvas.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas to create.",
            type: __2.ParamType.String
        },
        {
            name: "functions",
            description: "Functions.",
            type: __2.ParamType.String,
            typename: "Any",
            rest: true,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [name] = ctx.params;
        if (!ctx.data.canvas || !(ctx.data.canvas[ctx.data.canvas.length - 1] instanceof __1.CanvasBuilder))
            return ctx.aoiError.fnError(ctx, "custom", {}, `No size has been set.`);
        if (!ctx.data.canvasManager)
            ctx.data.canvasManager = new __1.CanvasManager();
        if (ctx.data.canvasManager?.get(name))
            return ctx.aoiError.fnError(ctx, "custom", {}, `A canvas with provided name already exists.`);
        const without = ctx.data.canvas.slice(0, ctx.data.canvas.length - 1);
        ctx.data.canvasManager.set(name, ctx.data.canvas[ctx.data.canvas.length - 1]);
        ctx.data.canvas = without.length === 0 ? undefined : without;
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=newCanvas.js.map