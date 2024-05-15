"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("@napi-rs/canvas");
const classes_1 = require("../classes");
exports.default = {
    name: "$strokeText",
    code: async (d) => {
        let data = d.util.aoiFunc(d);
        let [canvas = "canvas", text = "Text", color = "#000000", font = "15px " + canvas_1.GlobalFonts.families?.[0]?.family, x = "0", y = "0", strokeWidth = "10", maxWidth, textAlign, textBaseline] = data.inside.splits;
        if (!d.data.canvases || !(d.data.canvases instanceof classes_1.CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof classes_1.CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
        if (!d.data.canvases?.get(canvas)?.util.isValidFont(font))
            return d.aoiError.fnError(d, "custom", {}, `Invalid font.`);
        d.data.canvases?.get(canvas)?.strokeText(text, x, y, font, color, parseFloat(strokeWidth), parseFloat(maxWidth), textAlign, textBaseline);
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=strokeText.js.map