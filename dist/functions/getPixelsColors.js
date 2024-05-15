"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
exports.default = {
    name: "$getPixelsColors",
    code: async (d) => {
        let data = d.util.aoiFunc(d);
        let [canvas = "canvas", x = "0", y = "0", width, height] = data.inside.splits;
        if (!d.data.canvases || !(d.data.canvases instanceof classes_1.CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof classes_1.CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found. (canvas)`);
        data.result = JSON.stringify(await d.data.canvases.get(canvas)?.getPixelsColors(x, y, width, height));
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=getPixelsColors.js.map