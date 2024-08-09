import { createCanvas, loadImage } from "@napi-rs/canvas";
import { AoiFunction, CanvasBuilder, CanvasManager, GIFManager, Param, ParamType } from '../../';
import { existsSync } from "node:fs";

export default new AoiFunction<"djs">({
    name: "$addFrame",
    description: "Adds a frame to the GIF.",
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
            name: "frame",
            description: "The frame to add.",
            type: ParamType.String,
            typename: "Path | URL | Canvas",
            check: async (v, c) => 
                c.checkType(c, { type: ParamType.Url } as Param, v)
                || await existsSync(v) || (v.startsWith("canvas:")
                    && c.data.canvasManager && c.data.canvasManager instanceof CanvasManager && c.data.canvasManager.get(v.split("canvas:").slice(1).join(":")))
        }
    ],
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        let [ name, frame ] = ctx.params;

        const gif = name 
            ? ctx.data.gifManager?.get(name)
            : !name && ctx.data.gif 
                ? ctx.data.gif[ctx.data.gif.length - 1] : null;
                
        if (!gif)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No gif to add the frame to.");
        
        if (frame.startsWith("canvas:")) {
            frame = ((ctx.data.canvasManager as CanvasManager)
                .get(frame.split("canvas:").slice(1).join(":")) as CanvasBuilder)
                    .ctx;
        } else {
            const img = await loadImage(frame),
                  ctx = createCanvas(img.width, img.height).getContext('2d')
                  
            ctx.drawImage(img, 0, 0, img.width, img.height);
            frame = ctx;
        };
        
        await gif.addFrame(frame);

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});