"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
exports.default = new classes_1.AoiFunction({
    name: "$filter",
    description: "Use filters in your canvas.",
    params: [
        {
            name: "canvas",
            description: "The name of the canvas to use filters in.",
            type: classes_1.ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof classes_1.CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found."
        },
        {
            name: "method",
            description: "Method.",
            type: classes_1.ParamType.Enum,
            typename: "\"add\" | \"set\" | \"remove\" | \"clear\" | \"get\" | \"parse\"",
            enum: classes_1.FilterMethod
        },
        {
            name: "filter",
            description: "Name of the filter.",
            type: classes_1.ParamType.Enum,
            typename: "\"none\" | \"blur\" | \"sepia\" | \"grayscale\" | \"brightness\" | \"contrast\" | \"invert\" | \"saturate\"",
            enum: classes_1.Filters,
            optional: true
        },
        {
            name: "value",
            description: "Value of the filter.",
            type: classes_1.ParamType.Number,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [name, method, filter, value] = ctx.params;
        const canvas = name
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof classes_1.CanvasBuilder
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to use filters in.");
        if ((method === classes_1.FilterMethod.add || method === classes_1.FilterMethod.set || method === classes_1.FilterMethod.remove) && !name)
            return ctx.aoiError.fnError(ctx, "custom", {}, "This method requires the \"filter\" field.");
        if ((method === classes_1.FilterMethod.add || method === classes_1.FilterMethod.set) && !value)
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
//# sourceMappingURL=filter.js.map