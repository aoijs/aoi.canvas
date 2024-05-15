"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
exports.default = {
    name: "$setShadow",
    code: async (d) => {
        let data = d.util.aoiFunc(d);
        let [canvas = "canvas", blur = "0", color = "#000000", offset] = data.inside.splits;
        if (!d.data.canvases || !(d.data.canvases instanceof classes_1.CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof classes_1.CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
        d.data.canvases?.get(canvas)?.setShadow(parseFloat(blur), color, (offset?.trim()?.startsWith("[") && offset?.trim().endsWith("]") ? JSON.parse(offset) : parseFloat(offset)));
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=setShadow.js.map