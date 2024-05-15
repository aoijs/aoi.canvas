"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
const discord_js_1 = require("discord.js");
exports.default = {
    name: "$attachCanvas",
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