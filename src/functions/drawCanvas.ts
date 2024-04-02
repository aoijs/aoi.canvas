import { SKRSContext2D } from "@napi-rs/canvas";
import { CanvasBuilder, CanvasManager } from "../classes";
import { AoiD } from "../index"

export default {
    name: "$drawCanvas",
    info: {
        description: "Draw a canvas on canvas.",
        parameters: [
            {
                name: "canvas",
                description: "The canvas name.",
                type: "string",
                required: true
            },
            {
                name: "name",
                description: "The canvas name.",
                type: "string",
                required: true
            },
            {
                name: "x",
                description: "The canvas X position.",
                type: "number",
                required: true
            },
            {
                name: "y",
                description: "The canvas Y position.",
                type: "number",
                required: true
            },
            {
                name: "width",
                description: "The canvas width.",
                type: "number",
                required: true
            },
            {
                name: "height",
                description: "The canvas height.",
                type: "number",
                required: true
            },
            {
                name: "radius",
                description: "The canvas corners radius.",
                type: "number/array",
                required: false
            }
        ],
        examples: [
        ]
    },
    code: async (d: AoiD) => {
        let data = d.util.aoiFunc(d);
        let [ canvas = "canvas", name, x = "0", y = "0", width = "512", height = "512", radius = "0" ] = data.inside.splits;

        if (!d.data.canvases || !(d.data.canvases instanceof CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);

        const ctx = d.data.canvases?.get(name);
        if (!ctx)
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);

        if (isNaN(parseFloat(x)) || isNaN(parseFloat(y)))
            return d.aoiError.fnError(d, "custom", {}, `Invalid position parameter. (x/y)`);

        await d.data.canvases?.get(canvas)?.drawImage(
            ctx.render(),
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