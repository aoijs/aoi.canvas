"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
exports.default = {
    name: "$translate",
    code: async (d) => {
        let data = d.util.aoiFunc(d);
        let [canvas = "canvas", x = "0", y = "0"] = data.inside.splits;
        if (!d.data.canvases || !(d.data.canvases instanceof classes_1.CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof classes_1.CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
        const cnvas = d.data.canvases.get(canvas);
        if (!cnvas)
            return;
        cnvas.getContext()?.translate(parseFloat(x), parseFloat(y));
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=translate.js.map