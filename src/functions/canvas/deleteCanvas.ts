import { AoiFunction, CanvasManager, ParamType } from '../../';

export default new AoiFunction<"djs">({
    name: "$deleteCanvas",
    description: "Deletes a canvas.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas to delete.",
            type: ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found."
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);

        ctx.data.canvasManager?.remove(ctx.params[0]);

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});