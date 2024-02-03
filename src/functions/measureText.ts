import { CanvasBuilder, CanvasManager } from "../classes";
import { AoiD } from "../index"

export default {
    name: "$measureText",
    info: {
        description: "Measure some text.",
        parameters: [
            {
                name: "canvas",
                description: "The canvas name.",
                type: "string",
                required: true
            },
            {
                name: "text",
                description: "The text to measure.",
                type: "string",
                required: true
            },
            {
                name: "font",
                description: "The text font.",
                type: "font",
                required: false
            }
        ],
        examples: [
            {
                description: "This will make a canvas and then measure text.",
                code: `$measureText[mycanvas;Hello;15px Arial]
                       $createCanvas[mycanvas;300;320]`?.split("\n").map(x => x?.trim()).join("\n"),
                images: []
            }
        ]
    },
    code: async (d: AoiD) => {
        let data = d.util.aoiFunc(d);
        let [ canvas = "canvas", text = "Text", font = "15px Arial" ] = data.inside.splits;

        if (!d.data.canvases || !(d.data.canvases instanceof CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);

        if (!d.data.canvases?.get(canvas)?.util.isValidFont(font))
            return d.aoiError.fnError(d, "custom", {}, `Invalid font.`)

        const metrics = d.data.canvases?.get(canvas)?.measureText(text, font);

        data.result = JSON.stringify(metrics);

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};