const canvaError = require("../../index.js").utils.canvaError;

module.exports = {
    name: "$font",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", font] = data.inside.splits;

        if (d.data.canvases[name]) {
            d.data.canvases[name].ctx.font = font;
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        };

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}