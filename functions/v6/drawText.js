const { Utils } = require("../../util/utils.js");
const { convertToInt } = Utils;

module.exports = {
    name: "$drawText",
    type: "djs",
    code: async (d) => {
        const canvaError = require("../../index.js").utils.canvaError;
        const data = d.util.aoiFunc(d);
        const [name = "canvas", text = "Text", x = "1", y = "1"] = data.inside.splits;
        if (!d.data.canvases[name]) return canvaError.newError(d, 'Canvas with this name not found.');
        const ctx = d.data.canvases[name].ctx;
        ctx.fillText(text, convertToInt(x), convertToInt(y));
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}