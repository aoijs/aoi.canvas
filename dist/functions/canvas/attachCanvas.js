"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
const discord_js_1 = require("discord.js");
exports.default = new classes_1.AoiFunction({
    name: "$attachCanvas",
    description: "Attaches the canvas.",
    params: [
        {
            name: "canvas",
            description: "The name of the canvas to attach.",
            type: classes_1.ParamType.String,
            check: (v, c) => !!(c.data.canvasManager && c.data.canvasManager instanceof classes_1.CanvasManager && c.data.canvasManager.get(v)),
            checkError: () => "No canvas with provided name found.",
            optional: true
        },
        {
            name: "name",
            description: "The canvas attachment file name.",
            type: classes_1.ParamType.String,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        const [name, att] = ctx.params;
        const canvas = name
            ? ctx.data.canvasManager?.get(name)
            : !name && ctx.data.canvas && ctx.data.canvas[ctx.data.canvas.length - 1] instanceof classes_1.CanvasBuilder
                ? ctx.data.canvas[ctx.data.canvas.length - 1] : null;
        if (!canvas)
            return ctx.aoiError.fnError(ctx, "custom", {}, "No canvas to attach.");
        ctx.files.push(new discord_js_1.AttachmentBuilder(canvas.render(), {
            name: (att ?? "{canvas}.png")?.replace(/\{canvas\}/g, name ?? "canvas")
        }));
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=attachCanvas.js.map