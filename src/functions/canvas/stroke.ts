import { AoiFunction, CanvasBuilder, CanvasManager, ParamType } from "../../classes";

export default new AoiFunction<"djs">({
    name: "$stroke",
    description: "Strokes (outlines) the current path.",
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
            name: "width",
            description: "The stroke width.",
            type: ParamType.Number,
            optional: true
        }
    ],
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        const [ name, width = 1 ] = ctx.params;

        const canvas = name 
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof CanvasBuilder 
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;
                
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to stroke the current path in.");
        
        const context = canvas.ctx,
              oldwidth = context.lineWidth;
        
        context.lineWidth = width;
        context.stroke();
        context.lineWidth = oldwidth;

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});