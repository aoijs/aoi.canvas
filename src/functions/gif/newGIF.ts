import { GIFManager } from '../../';
import { AoiFunction, ParamType } from '../../';
const gifencoder = require("gif-encoder-2");

export default new AoiFunction<"djs">({
    name: "$newGIF",
    description: "Creates a new GIF.",
    params: [
        {
            name: "canvas",
            description: "Name of the GIF to create.",
            type: ParamType.String
        },
        {
            name: "functions",
            description: "Functions.",
            type: ParamType.String,
            typename: "Any",
            rest: true,
            optional: true
        }
    ],
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        const [ name ] = ctx.params;
        
        if (!ctx.data.gif)
            return ctx.aoiError.fnError(ctx, "custom", {}, `No size.`);

        if (!ctx.data.gifManager)
            ctx.data.gifManager = new GIFManager();

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