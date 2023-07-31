const canvaError = require("../../index.js").utils.canvaError;
const { createCanvas } = require('@napi-rs/canvas');
const { Utils } = require("../../util/utils.js");
const { convertToInt } = Utils;


module.exports = {
    name: "$createCanvas",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", w = "512", h = "512"] = data.inside.splits;
        if (isNaN(convertToInt(w)) || isNaN(convertToInt(h)))
            return canvaError.newError(d, "One or Two size parameters are not number.");
        let canv = await createCanvas(convertToInt(w), convertToInt(h));
        (d.data.canvases??={})[name] = {canvas: canv, ctx: canv.getContext("2d")};
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}