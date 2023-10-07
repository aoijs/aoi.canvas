const canvaError = require("../../index.js").utils.canvaError;

module.exports = {
    name: "$measureText",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", text, prop] = data.inside.splits;

        if (!text) return canvaError.newError(d, "Please provide text parameter.");
        if (!prop) return canvaError.newError(d, "Please provide property parameter.");

        if (d.data.canvases[name]) {
            let measureText = d.data.canvases[name].ctx.measureText(text);

            if (prop === "width" || prop === "w") {
                data.result = measureText.width;
            } else if (prop === "height" || prop === "h") {
                data.result = measureText.height;
            } else {
                return canvaError.newError(d, 'Unknown argument. Expected: width/height. Received: '+prop);
            }
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        };

        return {
            code: d.util.setCode(data)
        };
    }
}