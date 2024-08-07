import { AoiFunction, CanvasBuilder, CanvasManager, ParamType } from "../../classes";

export default new AoiFunction<"djs">({
    name: "$rotation",
    description: "Sets the rotation in the canvas.",
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
            name: "angle",
            description: "The rotation angle.",
            type: ParamType.Number
        }
    ],
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        const [ name, angle ] = ctx.params;

        const canvas = name 
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof CanvasBuilder 
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;

        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to set the rotation in.");
        
        await canvas.rotate(angle);

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});