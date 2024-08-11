import { AoiFunction, CanvasBuilder, CanvasManager, FilterMethod, Filters, ParamType } from '../../';

export default new AoiFunction<"djs">({
    name: "$filter",
    description: "Use filters in your canvas.",
    params: [
        {
            name: "canvas",
            description: "The name of the canvas to use filters in.",
            type: ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found."
        },
        {
            name: "method",
            description: "Method.",
            type: ParamType.Enum,
            enum: FilterMethod
        },
        {
            name: "filter",
            description: "Name of the filter.",
            type: ParamType.Enum,
            enum: Filters,
            optional: true
        },
        {
            name: "value",
            description: "Value of the filter.",
            type: ParamType.Number,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [ name, method, filter, value ] = ctx.params;

        const canvas = name 
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof CanvasBuilder 
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;

        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to use filters in.");

        if ((method === FilterMethod.add || method === FilterMethod.set || method === FilterMethod.remove) && !name)
            return ctx.aoiError.fnError(ctx, "custom", {}, "This method requires the \"filter\" field.");
        if ((method === FilterMethod.add || method === FilterMethod.set) && !value)
            return ctx.aoiError.fnError(ctx, "custom", {}, "This method requires the \"value\" field.");

        const res = await canvas.filter(method, filter, value);

        if (typeof res === "string")
            data.result = res;
        else if (typeof res === "object")
            data.result = JSON.stringify(res);

        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }    
});