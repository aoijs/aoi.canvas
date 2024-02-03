import { CanvasBuilder, CanvasManager } from "../classes";
import { AoiD } from "../index"

export default {
    name: "$drawImage",
    info: {
        description: "Draw an image.",
        parameters: [
            {
                name: "canvas",
                description: "The canvas name.",
                type: "string",
                required: true
            },
            {
                name: "src",
                description: "The image src.",
                type: "string",
                required: true
            },
            {
                name: "x",
                description: "The image X position.",
                type: "number",
                required: true
            },
            {
                name: "y",
                description: "The image Y position.",
                type: "number",
                required: true
            },
            {
                name: "width",
                description: "The image width.",
                type: "number",
                required: true
            },
            {
                name: "height",
                description: "The image height.",
                type: "number",
                required: true
            },
            {
                name: "radius",
                description: "The image corners radius.",
                type: "number/array",
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
        let [ canvas = "canvas", image, x = "0", y = "0", width = "512", height = "512", radius = "0" ] = data.inside.splits;

        if (!d.data.canvases || !(d.data.canvases instanceof CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);

        if (!image)
            return d.aoiError.fnError(d, "custom", {}, `No image src provided.`);

        if (isNaN(parseFloat(x)) || isNaN(parseFloat(y)))
            return d.aoiError.fnError(d, "custom", {}, `Invalid position parameter. (x/y)`);

        await d.data.canvases?.get(canvas)?.drawImage(
            image,
            parseFloat(x),
            parseFloat(y),
            (width ? parseFloat(width) : undefined),
            (height ? parseFloat(height) : undefined),
            (radius?.trim()?.startsWith("[") && radius?.trim().endsWith("]") ? JSON.parse(radius) : parseFloat(radius))
        );

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};