import { GlobalFonts } from "@napi-rs/canvas";
import { existsSync, statSync } from "node:fs"
import { AoiD } from "../index"

export default {
    name: "$registerFont",
    info: {
        description: "Sets shadow in a canvas.",
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

        if (!src)
            return d.aoiError.fnError(d, "custom", {}, "No font source.");

        if (existsSync(src))
            if (statSync(src).isDirectory())
                GlobalFonts.loadFontsFromDir(src);
            else if (statSync(src).isFile())
                GlobalFonts.registerFromPath(src, name);
            else
                return d.aoiError.fnError(d, "custom", {}, "Invalid font source.");
        else if (Buffer.isBuffer(src))
            GlobalFonts.register(src, name);
        else
            return d.aoiError.fnError(d, "custom", {}, "Invalid font source.");

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};