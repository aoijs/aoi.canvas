"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
exports.default = {
    name: "$drawLines",
    info: {
        description: "Draws lines.",
        parameters: [
            {
                name: "canvas",
                description: "The canvas name.",
                type: "string",
                required: true
            },
            {
                name: "type",
                description: "The action type. (0 = fill | 1 = draw)",
                type: "number",
                required: true
            },
            {
                name: "color",
                description: "The lines/fill color.",
                type: "color",
                required: true
            },
            {
                name: "strokeWidth",
                description: "The lines width.",
                type: "number",
                required: false
            },
            {
                name: "x",
                description: "The lines start X position.",
                type: "number",
                required: false
            },
            {
                name: "y",
                description: "The lines start Y position.",
                type: "number",
                required: false
            },
            {
                name: "...lines",
                description: "The lines. (x:y / move:x:y / bezier:controlX:controlY:endX:endY)",
                type: "string",
                required: true
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
        let [canvas = "canvas", type = "1", color = "#000000", strokeWidth = "10", x = "0", y = "0", ...lines] = data.inside.splits;
        if (!d.data.canvases || !(d.data.canvases instanceof classes_1.CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof classes_1.CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
        if (type?.toLowerCase()?.trim() === "draw")
            type = "1";
        else if (type?.toLowerCase()?.trim() === "fill")
            type = "0";
        if (lines && lines.length > 0)
            d.data.canvases?.get(canvas)?.drawLines(parseFloat(type), color, parseFloat(x), parseFloat(y), lines, parseFloat(strokeWidth));
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=drawLines.js.map