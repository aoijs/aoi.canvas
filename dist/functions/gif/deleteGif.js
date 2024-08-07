"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
exports.default = new classes_1.AoiFunction({
    name: "$deleteGIF",
    description: "Deletes a GIF.",
    params: [
        {
            name: "gif",
            description: "Name of the GIF.",
            type: classes_1.ParamType.String,
            check: (v, c) => !!(c.data.gifManager && c.data.gifManager instanceof classes_1.GIFManager && c.data.gifManager.get(v)),
            checkError: () => "No GIF with provided name found.",
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        ctx.data.gifManager?.remove(ctx.params[0]);
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=deleteGif.js.map