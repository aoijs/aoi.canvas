const canvaError = require("../../index.js").utils.canvaError;
const GIFEncoder = require('gif-encoder-2');

module.exports = {
    name: "$addFrame",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "gif", canvas = "canvas"] = data.inside.splits;

        if (name && canvas) {
            if (d.data.gifs[name]) {
                let gif = d.data.gifs[name].gif;
                if (d.data.canvases[canvas]) {
                    gif.addFrame(d.data.canvases[canvas].ctx);
                } else {
                    canvaError.newError(d, "Canvas with this name not found.")
                }
            } else {
                canvaError.newError(d, "GIF with this name not found.");
            };
        } else {
            canvaError.newError(d, "GIF and canvas parameters required.");
        };

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}