import { AoiFunction, CanvasBuilder, CanvasManager, ParamType } from "../../classes";

export default new AoiFunction<"djs">({
    name: "$letterSpacing",
    description: "Specifies the spacing between letters when drawing text.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas to set the letter spacing in.",
            type: ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "spacing",
            description: "The new letter spacing.",
            type: ParamType.Number
        }
    ],
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        let [ name, spacing ] = ctx.params;

        const canvas = name 
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof CanvasBuilder 
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;

        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to set the letter spacing in.");

        canvas.ctx.letterSpacing = spacing + "px";

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});