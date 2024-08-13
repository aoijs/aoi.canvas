"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
exports.default = new __1.AoiFunction({
    name: "$canvasSize",
    description: "Returns the canvas size.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas.",
            type: __1.ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof __1.CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "property",
            description: "The size property to return.",
            type: __1.ParamType.Enum,
            enum: __1.WidthOrHeight,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [name, property] = ctx.params;
        const canvas = name
            ? ctx.data.canvasManager?.get(name)?.ctx.canvas
            : !name && ctx.data.canvas && ctx.data.canvas instanceof __1.CanvasBuilder
                ? ctx.data.canvas.ctx.canvas : null;
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas.");
        const result = {
            width: canvas.width,
            height: canvas.height
        };
        data.result = property
            ? result[__1.MeasureTextProperty[typeof property === "number" ? __1.MeasureTextProperty[property] : property]]
            : JSON.stringify(result);
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=canvasSize.js.map