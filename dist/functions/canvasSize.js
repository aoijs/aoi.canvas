"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
exports.default = {
    name: "$canvasSize",
    code: async (d) => {
        let data = d.util.aoiFunc(d);
        let [canvas = "canvas", property = "width"] = data.inside.splits;
        property = property?.toLowerCase()?.trim();
        if (!d.data.canvases || !(d.data.canvases instanceof classes_1.CanvasManager))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
        let canvs = d.data.canvases.get(canvas);
        if (!canvs || !(canvs instanceof classes_1.CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
        canvs = canvs.getContext()?.canvas;
        const properties = {
            width: canvs.width,
            height: canvs.height,
            json: JSON.stringify({ width: canvs.width, height: canvs.height }),
            wxh: canvs.width + "x" + canvs.height
        };
        if (!properties[property])
            return d.aoiError.fnError(d, "custom", {}, `Invalid property.`);
        data.result = properties[property];
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=canvasSize.js.map