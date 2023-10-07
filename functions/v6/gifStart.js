const canvaError = require("../../index.js").utils.canvaError;
const GIFEncoder = require('gif-encoder-2');

module.exports = {
    name: "$gifStart",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "gif"] = data.inside.splits;

        if (name) {
            if (d.data.gifs[name]) {
                let gif = d.data.gifs[name].gif;
                await gif.start();
            } else {
                canvaError.newError(d, "GIF with this name not found.");
            };
        } else {
            canvaError.newError(d, "Name parameter required.");
        };

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}