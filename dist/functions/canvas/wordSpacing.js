"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
exports.default = new classes_1.AoiFunction({
    name: "$wordSpacing",
    description: "Specifies the spacing between words when drawing text.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas to set the word spacing in.",
            type: classes_1.ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof classes_1.CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "spacing",
            description: "The new word spacing.",
            type: classes_1.ParamType.Number
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        let [name, spacing] = ctx.params;
        const canvas = name
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof classes_1.CanvasBuilder
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to set the word spacing in.");
        canvas.ctx.wordSpacing = spacing + "px";
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=wordSpacing.js.map