import { AoiFunction, CanvasBuilder, CanvasManager, fillRule, ParamType } from '../../';

export default new AoiFunction<"djs">({
    name: "$fill",
    description: "Fills the current path.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas.",
            type: ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "rule",
            description: "The fill rule.",
            type: ParamType.Enum,
            enum: fillRule,
            optional: true
        }
    ],
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        const [ name, rule = fillRule.nonzero ] = ctx.params;

        const canvas = name 
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof CanvasBuilder 
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;
                
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to fill the current path in.");

        await canvas.ctx.fill(
            (typeof rule === "number" ? fillRule[rule] : rule) as CanvasFillRule
        );

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});