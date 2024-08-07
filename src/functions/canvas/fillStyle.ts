import { Image, loadImage } from "@napi-rs/canvas";
import { AoiFunction, CanvasBuilder, CanvasManager, ParamType, RepeatType } from "../../classes";

export default new AoiFunction<"djs">({
    name: "$fillStyle",
    description: "Sets the fill style in a canvas.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas to set the fill style in.",
            type: ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "style",
            description: "The style.",
            type: ParamType.String,
            typename: "Color | Gradient | Pattern"
        }
    ],
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        let [ name, style ] = ctx.params;

        const canvas = name 
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof CanvasBuilder 
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;

        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to set the fill style in.");

        if (style.startsWith("pattern:")) {
            const splits: string[] = style.split(":").slice(1),
                  type = splits.shift()?.toLowerCase(),
                  repeat = splits.length > 0 && ["repeat", "repeat-x", "repeat-y", "no-repeat"].includes(splits[splits.length - 1]) ? splits.pop() : null;
            let image: Image | ImageData;
        
            if (type === "canvas") {
                const canvas_2 = ctx.data.canvasManager?.get(repeat ? splits.slice(0, -1).join(":") : splits.join())?.ctx;
        
                if (!canvas_2)
                    return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas with provided name found. (pattern)");
        
                image = canvas_2.getImageData(0, 0, canvas_2.canvas.width, canvas_2.canvas.height);
            } else if (type === "image")
                image = await loadImage(repeat ? splits.slice(0, -1).join(":") : splits.join(), { maxRedirects: 30 });
            else return ctx.aoiError.fnError(ctx, "custom", {}, "Invalid pattern type.");

            style = canvas.ctx.createPattern(image, repeat as RepeatType);
        } else if (style.startsWith("gradient:"))
            style = ctx.data.gradients?.get(style.split(":").slice(1).join(":")) ?? style;
        
        canvas.ctx.fillStyle = style;

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});