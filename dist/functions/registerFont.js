"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("@napi-rs/canvas");
const node_fs_1 = require("node:fs");
exports.default = {
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
    code: async (d) => {
        let data = d.util.aoiFunc(d);
        let [src, name] = data.inside.splits;
        if (!src)
            return d.aoiError.fnError(d, "custom", {}, "No font source.");
        if ((0, node_fs_1.existsSync)(src))
            if ((0, node_fs_1.statSync)(src).isDirectory())
                canvas_1.GlobalFonts.loadFontsFromDir(src);
            else if ((0, node_fs_1.statSync)(src).isFile())
                canvas_1.GlobalFonts.registerFromPath(src, name);
            else
                return d.aoiError.fnError(d, "custom", {}, "Invalid font source.");
        else if (Buffer.isBuffer(src))
            canvas_1.GlobalFonts.register(src, name);
        else
            return d.aoiError.fnError(d, "custom", {}, "Invalid font source.");
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=registerFont.js.map