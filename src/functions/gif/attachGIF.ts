import { AoiFunction, GIFManager, ParamType } from '../../';
import { AttachmentBuilder } from "discord.js";

export default new AoiFunction<"djs">({
    name: "$attachGIF",
    description: "Attaches the GIF.",
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
            name: "name",
            description: "The GIF attachment file name.",
            type: ParamType.String,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        let [ name, att ] = ctx.params;

        const gif = name 
            ? ctx.data.gifManager?.get(name)
            : !name && ctx.data.gif 
                ? ctx.data.gif[ctx.data.gif.length - 1] : null;
                
        if (!gif)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No gif to attach.");
        
        ctx.files.push(new AttachmentBuilder(gif.out.getData(), {
            name: (att ? att?.replace(/\{gif\}/g, gif ?? "gif") : name) + ".gif"
        }));

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});