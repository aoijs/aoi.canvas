import { AoiFunction, GIFManager, ParamType } from "../../classes";

export default new AoiFunction<"djs">({
    name: "$setFPS",
    description: "Sets the FPS (Frames Per Second) of a GIF.",
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
            name: "frames",
            description: "Number of frames per second to display.",
            type: ParamType.Number,
            optional: true
        }
    ],
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        const [ name, fps ] = ctx.params;

        const gif = name 
            ? ctx.data.gifManager?.get(name)
            : !name && ctx.data.gif 
                ? ctx.data.gif[ctx.data.gif.length - 1] : null;
                
        if (!gif)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No gif to set the FPS of.");
        
        gif.setFramesPerSecond(fps);

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});