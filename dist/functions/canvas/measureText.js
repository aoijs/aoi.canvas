"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
exports.default = new classes_1.AoiFunction({
    name: "$measureText",
    description: "Measures text.",
    params: [
        {
            name: "canvas",
            description: "The name of the canvas to measure text in.",
            type: classes_1.ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof classes_1.CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "text",
            description: "The text to measure.",
            type: classes_1.ParamType.String
        },
        {
            name: "font",
            description: "The text font.",
            type: classes_1.ParamType.String,
            check: classes_1.CanvasUtil.isValidFont
        },
        {
            name: "property",
            description: "The result's property to return.",
            type: classes_1.ParamType.Enum,
            enum: classes_1.MeasureTextProperty,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [name, text, font, property] = ctx.params;
        const canvas = name
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof classes_1.CanvasBuilder
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to measure text in.");
        const result = await canvas.measureText(text, font);
        data.result = property
            ? result[classes_1.MeasureTextProperty[typeof property === "number" ? classes_1.MeasureTextProperty[property] : property]]
            : JSON.stringify(result);
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=measureText.js.map