"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("@napi-rs/canvas");
const classes_1 = require("../classes");
exports.default = {
    name: "$strokeRect",
    info: {
        description: "Draws a new stroke rect.",
        parameters: [
            {
                name: "canvas",
                description: "The canvas name.",
                type: "string",
                required: true
            },
            {
                name: "style",
                description: "The rect style.",
                type: "color",
                required: true
            },
            {
                name: "x",
                description: "The rect X position.",
                type: "number",
                required: false
            },
            {
                name: "y",
                description: "The rect Y position.",
                type: "number",
                required: false
            },
            {
                name: "width",
                description: "The rect width.",
                type: "number",
                required: true
            },
            {
                name: "height",
                description: "The rect height.",
                type: "number",
                required: true
            },
            {
                name: "strokeWidth",
                description: "The rect stroke width.",
                type: "number",
                required: false
            },
            {
                name: "radius",
                description: "The rect corners radius.",
                type: "number",
                required: false
            }
        ],
        examples: [
            {
                description: "This will create new 300x320 canvas with house.",
                code: `$attachCanvas[mycanvas;house.png]
                       $drawLines[mycanvas;draw;#03a9f4;10;50;140;150:60;250:140]
                       $fillRect[mycanvas;#03a9f4;130;190;40;60]
                       $strokeRect[mycanvas;#03a9f4;75;140;150;110]
                       $createCanvas[mycanvas;300;320]`?.split("\n").map(x => x?.trim()).join("\n"),
                images: []
            }
        ]
    },
    code: async (d) => {
        let data = d.util.aoiFunc(d);
        let [canvas = "canvas", style, x = "0", y = "0", width, height, strokeWidth, radius = "0"] = data.inside.splits;
        if (!d.data.canvases || !(d.data.canvases instanceof classes_1.CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof classes_1.CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
        const canvas_2 = d.data.canvases.get(canvas);
        if (!canvas_2)
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found. (canvas)`);
        const ctx = canvas_2.getContext();
        if (style && style?.trim()?.toLowerCase()?.startsWith("pattern:")) {
            const splits = style?.trim()?.split(":")?.slice(1);
            const typee = splits.shift();
            const isLastRepeat = splits[splits.length - 1] && ["repeat", "repeat-x", "repeat-y", "no-repeat"].includes(splits[splits.length - 1]);
            if (typee && typee?.toLowerCase() === "canvas") {
                const name = isLastRepeat ? splits?.slice(0, -1)?.join(":") : splits?.join();
                const repeat = isLastRepeat ? splits.pop() : null;
                const canvas_3 = d.data.canvases.get(name);
                if (!canvas_3)
                    return d.aoiError.fnError(d, "custom", {}, "No canvas with provided name found. (pattern)");
                const ctx_2 = canvas_3.getContext();
                style = ctx.createPattern(ctx_2.getImageData(0, 0, ctx_2.canvas.width, ctx_2.canvas.height), repeat);
            }
            else if (typee && typee?.toLowerCase() === "image") {
                const image = await (0, canvas_1.loadImage)(isLastRepeat ? splits?.slice(0, -1)?.join(":") : splits?.join());
                const repeat = isLastRepeat ? splits.pop() : null;
                style = ctx.createPattern(image, repeat);
            }
            ;
        }
        ;
        d.data.canvases.get(canvas)?.strokeRect(style, x, y, width, height, (!isNaN(parseFloat(strokeWidth)) ? parseFloat(strokeWidth) : 10), (radius?.trim()?.startsWith("[") && radius?.trim().endsWith("]") ? JSON.parse(radius) : parseFloat(radius)));
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=strokeRect.js.map