const canvaError = require("../../index.js").utils.canvaError;

module.exports = {
    name: "$setStroke",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", color, size] = data.inside.splits;

        if (d.data.canvases[name]) {
            d.data.canvases[name].ctx.strokeStyle = color;
            d.data.canvases[name].ctx.lineWidth = Number(size) || 5;
            await d.data.canvases[name].ctx.stroke();
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        };

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};