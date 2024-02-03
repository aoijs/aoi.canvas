import { CanvasBuilder, CanvasManager } from "../classes";
import { AoiD } from "../index"

export default {
    name: "$strokeText",
    info: {
        description: "Draw stroke text.",
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
                description: "The stroke color.",
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
                name: "strokeWidth",
                description: "The text stroke width.",
                type: "number",
                required: false
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
    code: async (d: AoiD) => {
        let data = d.util.aoiFunc(d);
        let [ canvas = "canvas", text = "Text", color = "#000000", font = "15px Arial", x = "0", y = "0", strokeWidth = "10", maxWidth, textAlign, textBaseline ] = data.inside.splits;

        if (!d.data.canvases || !(d.data.canvases instanceof CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);

        if (!d.data.canvases?.get(canvas)?.util.isValidFont(font))
            return d.aoiError.fnError(d, "custom", {}, `Invalid font.`);

        d.data.canvases?.get(canvas)?.strokeText(
            text,
            parseFloat(x),
            parseFloat(y),
            font,
            color,
            parseFloat(strokeWidth),
            parseFloat(maxWidth),
            textAlign,
            textBaseline
        )

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};