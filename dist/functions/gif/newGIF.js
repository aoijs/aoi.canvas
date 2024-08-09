"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const __2 = require("../../");
const gifencoder = require("gif-encoder-2");
exports.default = new __2.AoiFunction({
    name: "$newGIF",
    description: "Creates a new GIF.",
    params: [
        {
            name: "canvas",
            description: "Name of the GIF to create.",
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
        if (!ctx.data.gif)
            return ctx.aoiError.fnError(ctx, "custom", {}, `No size.`);
        if (!ctx.data.gifManager)
            ctx.data.gifManager = new __1.GIFManager();
        if (ctx.data.gifManager?.get(name))
            return ctx.aoiError.fnError(ctx, "custom", {}, `A canvas with provided name already exists.`);
        const without = ctx.data.gif.slice(0, ctx.data.gif.length - 1);
        ctx.data.gifManager.set(name, ctx.data.gif[ctx.data.gif.length - 1]);
        ctx.data.gif = without.length === 0 ? undefined : without;
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=newGIF.js.map