"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
exports.default = {
    name: "$setOpacity",
    code: async (d) => {
        let data = d.util.aoiFunc(d);
        let [canvas = "canvas", value = "1"] = data.inside.splits;
        if (!d.data.canvases || !(d.data.canvases instanceof classes_1.CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof classes_1.CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found. (canvas)`);
        const canvas_2 = d.data.canvases.get(canvas);
        if (!canvas_2)
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found. (canvas)`);
        canvas_2.getContext().globalAlpha = value?.endsWith("%") ? parseFloat(value) / 100 : parseFloat(value);
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=setOpacity.js.map