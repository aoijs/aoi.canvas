"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
exports.default = {
    name: "$createCanvas",
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