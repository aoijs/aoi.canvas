"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const node_fs_1 = require("node:fs");
const gifframes = require("gif-frames");
exports.default = new __1.AoiFunction({
    name: "$getFrames",
    description: "Extracts frames from a gif.",
    params: [
        {
            name: "src",
            description: "The gif.",
            type: __1.ParamType.String,
            check: async (v, c) => c.checkType(c, { type: __1.ParamType.Url }, v)
                || await (0, node_fs_1.existsSync)(v) || (v.startsWith("gif:")
                && c.data.gifManager && c.data.canvasManager instanceof __1.GIFManager && c.data.gifManager.get(v.split("gif:").slice(1).join(":"))),
            optional: true
        },
        {
            name: "amount",
            description: "The amount of frames to extract.",
            type: __1.ParamType.Number,
            check: (v) => v > 0,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        let [src, amount] = ctx.params;
        if (src.startsWith("gif:"))
            src = ctx.data.gifManager?.get(src.split("gif:").slice(1).join(":")).out.getData();
        data.result = JSON.stringify(await gifframes({ url: src, frames: amount ? amount - 1 : "all", outputType: "png" })
            .then((data) => data.map((x) => {
            const data = x.getImage().data;
            const colors = [];
            for (let i = 0; i < data.length; i += 4) {
                colors.push(__1.CanvasUtil.rgbaToHex(data[i] ?? 0, data[i + 1] ?? 0, data[i + 2] ?? 0, (data[i + 3] ?? 0) / 255));
            }
            ;
            return colors;
        })) ?? []);
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=getFrames.js.map