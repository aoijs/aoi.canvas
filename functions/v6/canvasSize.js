const canvaError = require("../../index.js").utils.canvaError;

module.exports = {
    name: "$canvasSize",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", prop] = data.inside.splits;

        if (!prop) return canvaError.newError(d, "Please provide property parameter.");

        if (d.data.canvases)

        if (d.data.canvases[name]) {
            let canv = d.data.canvases[name].canvas

            if (prop === "width" || prop === "w") {
                data.result = canv.width;
            } else if (prop === "height" || prop === "h") {
                data.result = canv.height;
            } else {
                return canvaError.newError(d, 'Unknown property. Expected: width/height. Received: '+prop);
            }
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        };

        return {
            code: d.util.setCode(data)
        };
    }
}