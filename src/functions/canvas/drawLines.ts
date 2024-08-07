import { AoiFunction, CanvasBuilder, CanvasManager, ParamType } from "../../classes";

export default new AoiFunction<"djs">({
    name: "$drawLines",
    description: "Draws lines.",
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
            name: "lines",
            description: "The lines to draw.",
            type: ParamType.String,
            typename: "Line | BezierCurve | QuadraticCurve",
            rest: true
        }
    ],
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        const [ name, lines ] = ctx.params;

        const canvas = name 
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof CanvasBuilder 
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;

        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to draw lines on.");

        await canvas.drawLines(lines);

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});