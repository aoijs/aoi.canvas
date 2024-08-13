import { AoiFunction, CanvasBuilder, CanvasManager, fillRule, ParamType } from '../../';

export default new AoiFunction<"djs">({
    name: "$clip",
    description: "Turns the current path into the current clipping region.",
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
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [ name, rule ] = ctx.params;

        const canvas = name 
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof CanvasBuilder 
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;
                
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to clip.");
        
        canvas.ctx.clip(fillRule[rule] as CanvasFillRule);

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});