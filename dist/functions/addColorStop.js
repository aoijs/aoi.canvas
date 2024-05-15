"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
exports.default = {
    name: "$addColorStop",
    code: async (d) => {
        let data = d.util.aoiFunc(d);
        let [canvas = "canvas", gradient = "gradient", offset = "0", color = "#000000"] = data.inside.splits;
        if (!d.data.canvases || !(d.data.canvases instanceof classes_1.CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof classes_1.CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
        d.data.canvases.get(canvas)?.addColorStop(gradient?.trim(), (offset?.endsWith("%") ? parseFloat(offset) / 100 : parseFloat(offset)), color);
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=addColorStop.js.map