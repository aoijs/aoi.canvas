"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("@napi-rs/canvas");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
exports.default = {
    name: "$registerFont",
    code: async (d) => {
        let data = d.util.aoiFunc(d);
        let [src, name] = data.inside.splits;
        if (!src || src?.trim() === "")
            return d.aoiError.fnError(d, "custom", {}, "No font source.");
        if (name && name?.trim() === "")
            return d.aoiError.fnError(d, "custom", {}, "Invalid font name.");
        if (canvas_1.GlobalFonts.has(name?.trim()))
            return d.aoiError.fnError(d, "custom", {}, "Font with provided name already exists.");
        src = (0, node_path_1.join)(process.cwd(), src);
        if (!(0, node_fs_1.existsSync)(src))
            return d.aoiError.fnError(d, "custom", {}, "Invalid font path.");
        if ((0, node_fs_1.statSync)(src).isDirectory())
            canvas_1.GlobalFonts.loadFontsFromDir(src);
        else if ((0, node_fs_1.statSync)(src).isFile())
            canvas_1.GlobalFonts.registerFromPath(src, name);
        else
            return d.aoiError.fnError(d, "custom", {}, "Invalid font source.");
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=registerFont.js.map