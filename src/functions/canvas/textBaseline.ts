import { AoiFunction, CanvasBuilder, CanvasManager, ParamType, textBaseline } from "../../classes";

export default new AoiFunction<"djs">({
    name: "$textBaseline",
    description: "Sets the text baseline in the canvas.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas to set the text baseline in.",
            type: ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "baseline",
            description: "The text baseline.",
            type: ParamType.Enum,
            enum: textBaseline
        }
    ],
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        let [ name, baseline ] = ctx.params;

        const canvas = name 
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof CanvasBuilder 
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;

        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to set the text baseline in.");

        if (typeof baseline === "string")
            baseline = textBaseline[baseline as any];

        canvas.ctx.textBaseline = textBaseline[baseline] as CanvasTextBaseline;

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});