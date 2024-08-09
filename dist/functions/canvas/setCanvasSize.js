"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
exports.default = new __1.AoiFunction({
    name: "$setCanvasSize",
    description: "Sets the size of the new canvas.",
    params: [
        {
            name: "width",
            description: "Width of the new canvas.",
            type: __1.ParamType.Number
        },
        {
            name: "height",
            description: "Height of the new canvas.",
            type: __1.ParamType.Number
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [width, height] = ctx.params;
        ctx.data.canvas = ctx.data.canvas && Array.isArray(ctx.data.canvas) ? ctx.data.canvas : [];
        ctx.data.canvas.push(new __1.CanvasBuilder(width, height));
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=setCanvasSize.js.map