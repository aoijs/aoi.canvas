import { Image, loadImage } from "@napi-rs/canvas";
import { AoiFunction, CanvasBuilder, CanvasManager, ParamType, RepeatType } from '../../';

export default new AoiFunction<"djs">({
    name: "$setShadow",
    description: "Sets the shadow (blur, style, offset) in a canvas.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas to set the shadow in.",
            type: ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "blur",
            description: "The shadow blur.",
            type: ParamType.Number
        },
        {
            name: "style",
            description: "The shadow style.",
            type: ParamType.String,
            typename: "Color"
        },
        {
            name: "offset",
            description: "The shadow offset",
            type: ParamType.Number,
            rest: true,
            optional: true
        }
    ],
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        let [ name, blur, style, offset ] = ctx.params;

        const canvas = name 
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof CanvasBuilder 
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;

        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to set the fill style in.");

        await canvas.setShadow(blur, style, offset);

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});