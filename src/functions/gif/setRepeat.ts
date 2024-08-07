import { AoiFunction, GIFManager, ParamType } from "../../classes";

export default new AoiFunction<"djs">({
    name: "$setRepeat",
    description: "Sets the number of loops GIF does.",
    params: [
        {
            name: "gif",
            description: "Name of the GIF.",
            type: ParamType.String,
            check: (v, c) => !!(c.data.gifManager && c.data.gifManager instanceof GIFManager && c.data.gifManager.get(v)),
            checkError: () => "No GIF with provided name found.",
            optional: true
        },
        {
            name: "loops",
            description: "The number of loops.",
            type: ParamType.Number,
            check: (v) => v >= 0
        }
    ],
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        let [ name, loops ] = ctx.params;

        const gif = name 
            ? ctx.data.gifManager?.get(name)
            : !name && ctx.data.gif 
                ? ctx.data.gif[ctx.data.gif.length - 1] : null;
                
        if (!gif)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No gif.");
        
        await gif.setRepeat(loops);

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});