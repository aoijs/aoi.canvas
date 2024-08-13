"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const discord_js_1 = require("discord.js");
exports.default = new __1.AoiFunction({
    name: "$attachGIF",
    description: "Attaches the GIF.",
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
            name: "name",
            description: "The GIF attachment file name.",
            type: __1.ParamType.String,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        let [name, att] = ctx.params;
        const gif = name
            ? ctx.data.gifManager?.get(name)
            : !name && ctx.data.gif
                ? ctx.data.gif[ctx.data.gif.length - 1] : null;
        if (!gif)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No gif to attach.");
        ctx.files.push(new discord_js_1.AttachmentBuilder(gif.out.getData(), {
            name: (att ? att?.replace(/\{gif\}/g, gif ?? "gif") : name) + ".gif"
        }));
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=attachGIF.js.map