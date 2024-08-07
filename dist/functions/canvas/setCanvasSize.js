"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
exports.default = new classes_1.AoiFunction({
    name: "$setCanvasSize",
    description: "Sets the size of the new canvas.",
    params: [
        {
            name: "width",
            description: "Width of the new canvas.",
            type: classes_1.ParamType.Number
        },
        {
            name: "height",
            description: "Height of the new canvas.",
            type: classes_1.ParamType.Number
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [width, height] = ctx.params;
        ctx.data.canvas = ctx.data.canvas && Array.isArray(ctx.data.canvas) ? ctx.data.canvas : [];
        ctx.data.canvas.push(new classes_1.CanvasBuilder(width, height));
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=setCanvasSize.js.map