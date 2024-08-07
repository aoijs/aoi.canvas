"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
exports.default = new classes_1.AoiFunction({
    name: "$deleteCanvas",
    description: "Deletes a canvas.",
    params: [
        {
            name: "canvas",
            description: "Name of the canvas to delete.",
            type: classes_1.ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof classes_1.CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found."
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        ctx.data.canvasManager?.remove(ctx.params[0]);
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=deleteCanvas.js.map