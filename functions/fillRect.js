const canvaError = require("../index.js").utils.canvaError;

module.exports = {
    name: "$fillRect",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", x, y, w, h] = data.inside.splits;

        if (d.data.canvases[name]) {
            await d.data.canvases[name].ctx.fillRect(Number(x), Number(y), Number(w), Number(h));
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        };

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}