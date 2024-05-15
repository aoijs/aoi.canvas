"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
exports.default = {
    name: "$drawImage",
    code: async (d) => {
        let data = d.util.aoiFunc(d);
        let [canvas = "canvas", image, x = "0", y = "0", width = "512", height = "512", radius = "0"] = data.inside.splits;
        if (!d.data.canvases || !(d.data.canvases instanceof classes_1.CanvasManager) || !d.data.canvases.get(canvas) || !(d.data.canvases.get(canvas) instanceof classes_1.CanvasBuilder))
            return d.aoiError.fnError(d, "custom", {}, `No canvas with provided name found.`);
        if (!image)
            return d.aoiError.fnError(d, "custom", {}, `No image src provided.`);
        if (image?.startsWith("https#COLON#//"))
            image = image.addBrackets();
        if (isNaN(parseFloat(x)) || isNaN(parseFloat(y)))
            return d.aoiError.fnError(d, "custom", {}, `Invalid position parameter. (x/y)`);
        await d.data.canvases?.get(canvas)?.drawImage(image, x, y, width, height, (radius?.trim()?.startsWith("[") && radius?.trim().endsWith("]") ? JSON.parse(radius) : parseFloat(radius)));
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
//# sourceMappingURL=drawImage.js.map