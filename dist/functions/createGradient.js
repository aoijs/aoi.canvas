"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
exports.default = {
    name: "$createGradient",
    code: async (d) => {
        let data = d.util.aoiFunc(d);
        let [canvas = "canvas", gradient = "gradient", type = "0", ...options] = data.inside.splits;
        if (!d.data.canvases || !(d.data.canvases instanceof classes_1.CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof classes_1.CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
        if (type?.toLowerCase()?.trim() === "conic")
            type = "2";
        else if (type?.toLowerCase()?.trim() === "radial")
            type = "1";
        else if (type?.toLowerCase()?.trim() === "linear")
            type = "0";
        console.log(gradient?.trim(), parseFloat(type), options?.map((x) => !isNaN(parseFloat(x)) ? parseFloat(x) : undefined));
        d.data.canvases.get(canvas)?.createGradient(gradient?.trim(), parseFloat(type), options?.map((x) => !isNaN(parseFloat(x)) ? parseFloat(x) : undefined));
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=createGradient.js.map