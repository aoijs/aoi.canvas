const canvaError = require("../../index.js").utils.canvaError;

module.exports = {
    name: "$canvasColor",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", color = "ffffff"] = data.inside.splits;

        if (d.data.canvases[name]) {
            d.data.canvases[name].ctx.fillStyle = color;
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        };

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}