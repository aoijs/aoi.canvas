import { AoiFunction, CanvasBuilder, ParamType } from '../../';

export default new AoiFunction<"djs">({
    name: "$setCanvasSize",
    description: "Sets the size of the new canvas.",
    params: [
        {
            name: "width",
            description: "Width of the new canvas.",
            type: ParamType.Number
        },
        {
            name: "height",
            description: "Height of the new canvas.",
            type: ParamType.Number
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [ width, height ] = ctx.params;

        ctx.data.canvas = ctx.data.canvas && Array.isArray(ctx.data.canvas) ? ctx.data.canvas : [];
        ctx.data.canvas.push(new CanvasBuilder(width, height));

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});