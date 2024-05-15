"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
exports.default = {
    name: "$filter",
    code: async (d) => {
        let data = d.util.aoiFunc(d);
        let [canvas = "canvas", method = "get", name, value] = data.inside.splits;
        if (!d.data.canvases || !(d.data.canvases instanceof classes_1.CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof classes_1.CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
        const res = d.data.canvases.get(canvas)?.filter(method?.trim(), name, parseFloat(value));
        if (typeof res === "string")
            data.result = res;
        else if (typeof res === "object")
            data.result = JSON.stringify(res);
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=filter.js.map