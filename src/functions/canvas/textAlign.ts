import { AoiFunction, CanvasBuilder, CanvasManager, ParamType, textAlign } from '../../';

export default new AoiFunction<"djs">({
    name: "$textAlign",
    description: "Sets the text align in the canvas.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas to set the text align in.",
            type: ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "align",
            description: "The text align.",
            type: ParamType.Enum,
            enum: textAlign
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [ name, align ] = ctx.params;

        const canvas = name 
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof CanvasBuilder 
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;

        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to set the text align in.");

        canvas.ctx.textAlign = align as CanvasTextAlign;

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});