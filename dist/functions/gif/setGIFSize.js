"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
const gifencoder = require("gif-encoder-2");
exports.default = new classes_1.AoiFunction({
    name: "$setGIFSize",
    description: "Sets the size of the new GIF.",
    params: [
        {
            name: "width",
            description: "Width of the new GIF.",
            type: classes_1.ParamType.Number
        },
        {
            name: "height",
            description: "Height of the new GIF.",
            type: classes_1.ParamType.Number
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [width, height] = ctx.params;
        const gif = new gifencoder(width, height);
        gif.start();
        ctx.data.gif = ctx.data.gif && Array.isArray(ctx.data.gif) ? ctx.data.gif : [];
        ctx.data.gif.push(gif);
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=setGIFSize.js.map