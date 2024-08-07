import { AoiFunction, GIFManager, ParamType } from "../../classes";

export default new AoiFunction<"djs">({
    name: "$setThreshold",
    description: "Sets if the color table should be reused if current frame matches previous frame.",
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
            name: "percentage",
            description: "Threshold percentage.",
            type: ParamType.Number,
            check: (v) => v <= 100 && v >= 0
        }
    ],
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        let [ name, percentage ] = ctx.params;

        const gif = name 
            ? ctx.data.gifManager?.get(name)
            : !name && ctx.data.gif 
                ? ctx.data.gif[ctx.data.gif.length - 1] : null;
                
        if (!gif)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No gif.");
        
        await gif.setThreshold(percentage);

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});