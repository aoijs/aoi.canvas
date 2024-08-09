"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("@napi-rs/canvas");
const __1 = require("../../");
const node_fs_1 = require("node:fs");
exports.default = new __1.AoiFunction({
    name: "$addFrame",
    description: "Adds a frame to the GIF.",
    params: [
        {
            name: "gif",
            description: "Name of the GIF.",
            type: __1.ParamType.String,
            check: (v, c) => !!(c.data.gifManager && c.data.gifManager instanceof __1.GIFManager && c.data.gifManager.get(v)),
            checkError: () => "No GIF with provided name found.",
            optional: true
        },
        {
            name: "frame",
            description: "The frame to add.",
            type: __1.ParamType.String,
            typename: "Path | URL | Canvas",
            check: async (v, c) => c.checkType(c, { type: __1.ParamType.Url }, v)
                || await (0, node_fs_1.existsSync)(v) || (v.startsWith("canvas:")
                && c.data.canvasManager && c.data.canvasManager instanceof __1.CanvasManager && c.data.canvasManager.get(v.split("canvas:").slice(1).join(":")))
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        let [name, frame] = ctx.params;
        const gif = name
            ? ctx.data.gifManager?.get(name)
            : !name && ctx.data.gif
                ? ctx.data.gif[ctx.data.gif.length - 1] : null;
        if (!gif)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No gif to add the frame to.");
        if (frame.startsWith("canvas:")) {
            frame = ctx.data.canvasManager
                .get(frame.split("canvas:").slice(1).join(":"))
                .ctx;
        }
        else {
            const img = await (0, canvas_1.loadImage)(frame), ctx = (0, canvas_1.createCanvas)(img.width, img.height).getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height);
            frame = ctx;
        }
        ;
        await gif.addFrame(frame);
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=addFrame.js.map