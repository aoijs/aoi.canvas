const canvaError = require("../../index.js").utils.canvaError;

module.exports = {
    name: "$canvasSize",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", prop, newvalue = "none"] = data.inside.splits;

        if (!prop) return canvaError.newError(d, "Please provide property parameter.");

        if (!d.data.canvases) return canvaError.newError(d, `There is no canvases ever created.`);

        if (d.data.canvases[name]) {
            let canv = d.data.canvases[name].canvas

            if (!isNaN(parseFloat(newvalue))) {
                if (prop === "width" || prop === "w") {
                    data.result = canv.width;
                } else if (prop === "height" || prop === "h") {
                    data.result = canv.height;
                } else {
                    return canvaError.newError(d, 'Unknown property. Expected: width/height. Received: '+prop);
                }
            } else {
                if (prop === "width" || prop === "w") {
                    canv.width = newvalue;
                } else if (prop === "height" || prop === "h") {
                    canv.height = newvalue;
                } else {
                    return canvaError.newError(d, 'Unknown property. Expected: width/height. Received: '+prop);
                }
            }
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        };

        return {
            code: d.util.setCode(data)
        };
    }
}