const canvaError = require("../../index.js").utils.canvaError;

module.exports = {
    name: "$setStroke",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", text, arg] = data.inside.splits;

        if (d.data.canvases[name]) {
            let measureText = d.data.canvases[name].ctx.measureText(text);

            if (arg === "width") {
                data.result = measureText.width;
            } else if (arg == "height") {
                data.result = measureText.height;
            } else {
                return canvaError.newError(d, 'Unknown argument.');
            }
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        };

        return {
            code: d.util.setCode(data)
        };
    }
}