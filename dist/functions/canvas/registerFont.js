"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("@napi-rs/canvas");
const __1 = require("../../");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
exports.default = new __1.AoiFunction({
    name: "$registerFont",
    description: "Registers a font.",
    params: [
        {
            name: "src",
            description: "The font source.",
            type: __1.ParamType.String,
            check: async (v, c) => await (0, node_fs_1.existsSync)((0, node_path_1.join)(process.cwd(), v)),
            checkError: () => "Invalid font source.",
            typename: "Path | URL",
        },
        {
            name: "name",
            description: "The font name.",
            type: __1.ParamType.String,
            check: (v) => !canvas_1.GlobalFonts.has(v),
            checkError: () => "Font with provided name already exists.",
            rest: true,
            optional: true
        }
    ],
    code: async (ctx) => {
        const data = ctx.util.aoiFunc(ctx);
        let [src, name] = ctx.params;
        src = (0, node_path_1.join)(process.cwd(), src);
        if (await (0, node_fs_1.statSync)(src).isFile())
            canvas_1.GlobalFonts.registerFromPath(src, name[0]);
        else if (await (0, node_fs_1.statSync)(src).isDirectory())
            await (0, node_fs_1.readdirSync)(src)
                .filter(x => [".ttf", ".otf", ".woff", ".woff2"].find(y => x?.endsWith(y)))
                ?.forEach((x, i) => canvas_1.GlobalFonts.registerFromPath((0, node_path_1.join)(src, x), name?.[i]));
        else
            return ctx.aoiError.fnError(ctx, "custom", {}, "Invalid font source.");
        return {
            code: ctx.util.setCode(data),
            data: ctx.data
        };
    }
});
//# sourceMappingURL=registerFont.js.map