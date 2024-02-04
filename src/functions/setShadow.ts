import { CanvasBuilder, CanvasManager } from "../classes";
import { AoiD } from "../index"

export default {
    name: "$setShadow",
    info: {
        description: "Sets shadow in a canvas.",
        parameters: [
            {
                name: "canvas",
                description: "The canvas name.",
                type: "string",
                required: true
            },
            {
                name: "blur",
                description: "The shadow blur.",
                type: "number",
                required: true
            },
            {
                name: "color",
                description: "The shadow color.",
                type: "color",
                required: true
            },
            {
                name: "offset",
                description: "The shadow offset.",
                type: "number",
                required: false
            },
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
        let [ canvas = "canvas", blur = "0", color = "#000000", offset ] = data.inside.splits;

        if (!d.data.canvases || !(d.data.canvases instanceof CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);

        d.data.canvases?.get(canvas)?.setShadow(
            parseFloat(blur),
            color,
            (offset?.trim()?.startsWith("[") && offset?.trim().endsWith("]") ? JSON.parse(offset) : parseFloat(offset))
        )

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};