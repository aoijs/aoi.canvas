"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
exports.default = {
    name: "$measureText",
    code: async (d) => {
        let data = d.util.aoiFunc(d);
        let [canvas = "canvas", text = "Text", font = "15px Arial", property = "json"] = data.inside.splits;
        if (!d.data.canvases || !(d.data.canvases instanceof classes_1.CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof classes_1.CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
        if (!d.data.canvases?.get(canvas)?.util.isValidFont(font))
            return d.aoiError.fnError(d, "custom", {}, `Invalid font.`);
        const metrics = d.data.canvases?.get(canvas)?.measureText(text, font);
        if (property?.trim() === "json")
            data.result = JSON.stringify(metrics);
        else
            data.result = metrics[property];
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=measureText.js.map