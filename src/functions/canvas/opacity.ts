import { AoiFunction, CanvasBuilder, CanvasManager, GetOrSet, ParamType } from '../../';

export default new AoiFunction<"djs">({
    name: "$opacity",
    description: "Gets or sets the opacity in the canvas.",
    params: [
        {
            name: "canvas",
            description: "The name of the canvas to get or set the opacity in.",
            type: ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found."
        },
        {
            name: "method",
            description: "Method.",
            type: ParamType.Enum,
            enum: GetOrSet
        },
        {
            name: "value",
            description: "New value.",
            type: ParamType.Number,
            typename: "Percentages",
            check: (x) => x / 100 >= 0 && x / 100 <= 1,
            optional: true
        }
    ],
    code: async (ctx): Promise<any> => {
        const data = ctx.util.aoiFunc(ctx);
        const [ name, method, value = 100 ] = ctx.params;

        const canvas = ctx.data.canvasManager?.get(name) as CanvasBuilder;

        if (method === GetOrSet.get)
            data.result = Math.round(canvas.ctx.globalAlpha * 100);
        else
            canvas.ctx.globalAlpha = value / 100;

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});