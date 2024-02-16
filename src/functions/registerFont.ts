import { GlobalFonts } from "@napi-rs/canvas";
import { existsSync, statSync } from "node:fs"
import { join } from "node:path"
import { AoiD } from "../index"

export default {
    name: "$registerFont",
    info: {
        description: "Register a font.",
        parameters: [
            {
                name: "src",
                description: "The font source.",
                type: "string",
                required: true
            },
            {
                name: "name",
                description: "The font family name.",
                type: "string",
                required: false
            }
        ],
        examples: [
            /*{
                description: "This will make a canvas and then measure text.",
                code: `$measureText[mycanvas;Hello;15px Arial]
                       $createCanvas[mycanvas;300;320]`?.split("\n").map(x => x?.trim()).join("\n"),
                images: []
            }*/
        ]
    },
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