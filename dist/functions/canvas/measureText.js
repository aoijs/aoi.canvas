"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
exports.default = new __1.AoiFunction({
    name: "$measureText",
    description: "Measures text.",
    params: [
        {
            name: "canvas",
            description: "The name of the canvas to measure text in.",
            type: __1.ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof __1.CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "text",
            description: "The text to measure.",
            type: __1.ParamType.String
        },
        {
            name: "font",
            description: "The text font.",
            type: __1.ParamType.String,
            check: __1.CanvasUtil.isValidFont
        },
        {
            name: "property",
            description: "The result's property to return.",
            type: __1.ParamType.Enum,
            enum: __1.MeasureTextProperty,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [name, text, font, property] = ctx.params;
        const canvas = name
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof __1.CanvasBuilder
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to measure text in.");
        const result = await canvas.measureText(text, font);
        data.result = property
            ? result[__1.MeasureTextProperty[typeof property === "number" ? __1.MeasureTextProperty[property] : property]]
            : JSON.stringify(result);
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=measureText.js.map