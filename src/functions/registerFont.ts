import { GlobalFonts } from "@napi-rs/canvas";
import { existsSync, statSync } from "node:fs"
import { join } from "node:path"
import { AoiD } from "../index"

export default {
    name: "$registerFont",
    code: async (d: AoiD) => {
        let data = d.util.aoiFunc(d);
        let [ src, name ] = data.inside.splits;

        if (!src || src?.trim() === "")
            return d.aoiError.fnError(d, "custom", {}, "No font source.");
        if (name && name?.trim() === "")
            return d.aoiError.fnError(d, "custom", {}, "Invalid font name.");
        if (GlobalFonts.has(name?.trim()))
            return d.aoiError.fnError(d, "custom", {}, "Font with provided name already exists.");

        src = join(process.cwd(), src);
        if (!existsSync(src))
            return d.aoiError.fnError(d, "custom", {}, "Invalid font path.");
        
        if (statSync(src).isDirectory())
            GlobalFonts.loadFontsFromDir(src);
        else if (statSync(src).isFile())
            GlobalFonts.registerFromPath(src, name);
        else
            return d.aoiError.fnError(d, "custom", {}, "Invalid font source.");

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};