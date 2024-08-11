import { AoiFunction, CanvasBuilder, CanvasManager, ParamType } from '../../';

export default new AoiFunction<"djs">({
    name: "$setTransform",
    description: "Resets (overrides) the current transformation to the identity matrix, and then invokes a transformation described by the arguments of this method.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas to set the transformation in.",
            type: ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "a",
            description: "The cell in the first row and first column of the matrix.",
            type: ParamType.Number
        },
        {
            name: "b",
            description: "The cell in the second row and first column of the matrix.",
            type: ParamType.Number
        },
        {
            name: "c",
            description: "The cell in the first row and second column of the matrix.",
            type: ParamType.Number
        },
        {
            name: "d",
            description: "The cell in the second row and second column of the matrix.",
            type: ParamType.Number
        },
        {
            name: "e",
            description: "The cell in the first row and third column of the matrix.",
            type: ParamType.Number
        },
        {
            name: "f",
            description: "The cell in the second row and third column of the matrix.",
            type: ParamType.Number
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        let [ name, a, b, c, d, e, f ] = ctx.params;

        const canvas = name 
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof CanvasBuilder 
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;

        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to add a translation transformation in.");

        canvas.ctx.setTransform(a, b, c, d, e, f);

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});