const canvaError = require("../../index.js").utils.canvaError;

module.exports = {
    name: "$setStroke",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", text, arg] = data.inside.splits;
        if (!d.data.canvases[name]) return canvaError.newError(d, 'Canvas with this name not found.');
        if (!["width", "height"].includes(arg)) return canvaError.newError(d, 'Unknown argument.');
        let measureText = d.data.canvases[name].ctx.measureText(text);
        switch (arg) {
            case "height": { data.result = measureText.height };
            case "width": { data.result = measureText.width };
        };
        return {
            code: d.util.setCode(data)
        };
    }
}