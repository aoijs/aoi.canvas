"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
const discord_js_1 = require("discord.js");
exports.default = {
    name: "$attachCanvas",
    info: {
        description: "Attachs canvas.",
        parameters: [
            {
                name: "canvas",
                description: "The canvas name.",
                type: "string",
                required: true
            },
            {
                name: "name",
                description: "The attachment name.",
                type: "string",
                required: false
            }
        ],
        examples: [
            {
                description: "This will create new 300x320 canvas with house and add an attachment house.png.",
                code: `$attachCanvas[mycanvas;house.png]
                       $drawLines[mycanvas;draw;#03a9f4;50;140;150;60;250;140]
                       $fillRect[mycanvas;#03a9f4;130;190;40;60]
                       $strokeRect[mycanvas;#03a9f4;75;140;150;110]
                       $createCanvas[mycanvas;300;320]`?.split("\n").map(x => x?.trim()).join("\n"),
                images: []
            },
            {
                description: "This will create new 300x320 canvas with house and add an attachment with name of your canvas. (mycanvas.png)",
                code: `$attachCanvas[mycanvas]
                       $drawLines[mycanvas;draw;#03a9f4;50;140;150;60;250;140]
                       $fillRect[mycanvas;#03a9f4;130;190;40;60]
                       $strokeRect[mycanvas;#03a9f4;75;140;150;110]
                       $createCanvas[mycanvas;300;320]`?.split("\n").map(x => x?.trim()).join("\n"),
                images: []
            }
        ]
    },
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [canvas = "canvas", name = `{canvas}.png`] = data.inside.splits;
        const canvases = d.data.canvases;
        if (!canvases || !(canvases instanceof classes_1.CanvasManager))
            return d.aoiError.fnError(d, "custom", {}, `No canvases found.`);
        const canvs = canvases.get(canvas);
        if (!canvs || !(canvs instanceof classes_1.CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
        const attachment = new discord_js_1.AttachmentBuilder(canvs.render(), {
            name: name?.replace(/{canvas}/g, canvas)
        });
        d.files.push(attachment);
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=attachCanvas.js.map