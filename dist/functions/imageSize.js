"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("@napi-rs/canvas");
exports.default = {
    name: "$imageSize",
    code: async (d) => {
        let data = d.util.aoiFunc(d);
        let [image, property = "width"] = data.inside.splits;
        if (!image)
            return d.aoiError.fnError(d, "custom", {}, `No image src provided.`);
        if (image?.startsWith("https#COLON#//"))
            image = image.addBrackets();
        image = await (0, canvas_1.loadImage)(image, { maxRedirects: 30 });
        const properties = {
            width: image.width,
            height: image.height,
            json: JSON.stringify({ width: image.width, height: image.height }),
            wxh: image.width + "x" + image.height
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
//# sourceMappingURL=imageSize.js.map