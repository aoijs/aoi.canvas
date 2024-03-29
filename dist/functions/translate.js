"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
exports.default = {
    name: "$translate",
    info: {
        description: "Adds a translation transformation.",
        parameters: [
            {
                name: "canvas",
                description: "The canvas name.",
                type: "string",
                required: true
            },
            {
                name: "x",
                description: "Distance to move in the horizontal direction. Positive values are to the right, and negative to the left.",
                type: "number",
                required: false
            },
            {
                name: "y",
                description: "Distance to move in the vertical direction. Positive values are down, and negative are up.",
                type: "number",
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
        let [canvas = "canvas", x = "0", y = "0"] = data.inside.splits;
        if (!d.data.canvases || !(d.data.canvases instanceof classes_1.CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof classes_1.CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
        const cnvas = d.data.canvases.get(canvas);
        if (!cnvas)
            return;
        cnvas.getContext()?.translate(parseFloat(x), parseFloat(y));
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=translate.js.map