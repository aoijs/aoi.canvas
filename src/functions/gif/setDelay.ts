import { AoiFunction, GIFManager, ParamType } from '../../';

export default new AoiFunction<"djs">({
    name: "$setDelay",
    description: "Sets the GIF display frame delay.",
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
            name: "delay",
            description: "Number of milliseconds to display frame",
            type: ParamType.Number,
            check: (v) => v >= 0
        }
    ],
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        let [ name, delay ] = ctx.params;

        const gif = name 
            ? ctx.data.gifManager?.get(name)
            : !name && ctx.data.gif 
                ? ctx.data.gif[ctx.data.gif.length - 1] : null;
                
        if (!gif)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No gif.");
        
        await gif.setDelay(delay);

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});