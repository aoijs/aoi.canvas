"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
exports.default = {
    name: "$createCanvas",
    info: {
        description: "Creates a new canvas.",
        parameters: [
            {
                name: "canvas",
                description: "The canvas name.",
                type: "string",
                required: true
            },
            {
                name: "width",
                description: "The canvas width.",
                type: "number",
                required: false
            },
            {
                name: "height",
                description: "The canvas height.",
                type: "number",
                required: false
            }
        ],
        examples: [
            {
                description: "This will create new 512x512 canvas with red rect and then add an attachment. (red.png)",
                code: `$attachCanvas[mycanvas;red.png]
                       $fillRect[mycanvas;#FF0000;0;0;512;512]
                       $createCanvas[mycanvas;512;512]`?.split("\n").map(x => x?.trim()).join("\n"),
                images: []
            }
        ]
    },
    code: async (d) => {
        let data = d.util.aoiFunc(d);
        let [name = "canvas", width = "512", height = "512"] = data.inside.splits;
        if (!d.data.canvases)
            d.data.canvases = new classes_1.CanvasManager();
        d.data.canvases.create(name?.trim(), parseFloat(width), parseFloat(height));
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=createCanvas.js.map