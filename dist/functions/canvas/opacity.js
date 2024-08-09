"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
exports.default = new __1.AoiFunction({
    name: "$opacity",
    description: "Gets or sets the opacity in the canvas.",
    params: [
        {
            name: "canvas",
            description: "The name of the canvas to get or set the opacity in.",
            type: __1.ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof __1.CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found."
        },
        {
            name: "method",
            description: "Method.",
            type: __1.ParamType.Enum,
            enum: __1.GetOrSet
        },
        {
            name: "value",
            description: "New value.",
            type: __1.ParamType.Number,
            typename: "Percentages",
            check: (x) => x / 100 >= 0 && x / 100 <= 1,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [name, method, value = 100] = ctx.params;
        const canvas = ctx.data.canvasManager?.get(name);
        if (method === __1.GetOrSet.get)
            data.result = Math.round(canvas.ctx.globalAlpha * 100);
        else
            canvas.ctx.globalAlpha = value / 100;
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=opacity.js.map