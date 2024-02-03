import { CanvasBuilder, CanvasManager } from "../classes";
import { AoiD } from "../index"

export default {
    name: "$addColorStop",
    info: {
        description: "Add a color stop to gradient.",
        parameters: [
            {
                name: "canvas",
                description: "The canvas name.",
                type: "string",
                required: true
            },
            {
                name: "gradient",
                description: "The gradient name.",
                type: "string",
                required: true
            },
            {
                name: "offset",
                description: "The color stop offset.",
                type: "number",
                required: true
            },
            {
                name: "color",
                description: "The color of the stop.",
                type: "number",
                required: true
            }
        ],
        examples: [
            /*{
                description: "This will create new 512x512 canvas with red rect.",
                code: `$attachCanvas[mycanvas;red.png]
                       $fillRect[mycanvas;#FF0000;0;0;512;512]
                       $createCanvas[mycanvas;512;512]`?.split("\n").map(x => x?.trim()).join("\n"),
                images: []
            }*/
        ]
    },
    code: async (d: AoiD) => {
        let data = d.util.aoiFunc(d);
        let [ canvas = "canvas", gradient = "gradient", offset = "0", color = "#000000" ] = data.inside.splits;

        if (!d.data.canvases || !(d.data.canvases instanceof CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);

        d.data.canvases.get(canvas)?.addColorStop(
            gradient?.trim(),
            parseFloat(offset),
            color
        )
        
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};