"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
exports.default = {
    name: "$downloadCanvas",
    code: async (d) => {
        let data = d.util.aoiFunc(d);
        let [canvas = "canvas", path = "./{canvas}.png"] = data.inside.splits;
        if (!d.data.canvases || !(d.data.canvases instanceof classes_1.CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof classes_1.CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
        const buffer = d.data.canvases?.get(canvas)?.render();
        if (buffer)
            (0, node_fs_1.writeFileSync)((0, node_path_1.join)(process.cwd(), path?.replace(/{canvas}/g, canvas)), buffer);
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=downloadCanvas.js.map