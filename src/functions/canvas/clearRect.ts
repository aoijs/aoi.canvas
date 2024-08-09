import { CanvasBuilder, CanvasManager, AoiFunction, ParamType } from '../../';

export default new AoiFunction<"djs">({
    name: "$clearRect",
    description: "Erases pixels in a rect area.",
    params: [
        {
            name: "canvas",
            description: "The canvas name.",
            type: ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "x",
            description: "The rect start X coordinate.",
            type: ParamType.Number
        },
        {
            name: "y",
            description: "The rect start Y coordinate.",
            type: ParamType.Number
        },
        {
            name: "width",
            description: "The rect width.",
            type: ParamType.Number
        },
        {
            name: "height",
            description: "The rect height.",
            type: ParamType.Number
        },
        {
            name: "radius",
            description: "The rect corners radius.",
            type: ParamType.Number,
            check: (x) => !!(x >= 0),
            rest: true,
            optional: true
        }
    ],
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        let [ name, x, y, width, height, radius ] = ctx.params;

        const canvas = name 
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof CanvasBuilder 
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;
                
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas.");

        await canvas.clearRect(
            x,
            y,
            width,
            height,
            radius && radius.length === 1 ? radius[0] : radius
        );

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});