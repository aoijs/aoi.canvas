"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("@napi-rs/canvas");
const classes_1 = require("../classes");
exports.default = {
    name: "$fillText",
    info: {
        description: "Draw text.",
        parameters: [
            {
                name: "canvas",
                description: "The canvas name.",
                type: "string",
                required: true
            },
            {
                name: "text",
                description: "The text.",
                type: "string",
                required: true
            },
            {
                name: "color",
                description: "The text color.",
                type: "color",
                required: false
            },
            {
                name: "font",
                description: "The text font.",
                type: "font",
                required: false
            },
            {
                name: "x",
                description: "The text X position.",
                type: "number",
                required: true
            },
            {
                name: "y",
                description: "The text Y position.",
                type: "number",
                required: true
            },
            {
                name: "maxWidth",
                description: "The text max width.",
                type: "number",
                required: false
            },
            {
                name: "align",
                description: "The text align.",
                type: "string",
                required: false
            },
            {
                name: "baseline",
                description: "The text baseline.",
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
        let [canvas = "canvas", text = "Text", color = "#000000", font = "15px " + canvas_1.GlobalFonts.families?.[0]?.family, x = "0", y = "0", maxWidth, textAlign, textBaseline] = data.inside.splits;
        if (!d.data.canvases || !(d.data.canvases instanceof classes_1.CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof classes_1.CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
        if (!d.data.canvases?.get(canvas)?.util.isValidFont(font))
            return d.aoiError.fnError(d, "custom", {}, `Invalid font.`);
        d.data.canvases?.get(canvas)?.fillText(text, x, y, font, color, parseFloat(maxWidth), textAlign, textBaseline);
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=fillText.js.map