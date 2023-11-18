const canvaError = require("../../index.js").utils.canvaError;
const GIFEncoder = require('gif-encoder-2');

module.exports = {
    name: "$gifFinish",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "gif"] = data.inside.splits;

        if (!d.data.gifs) return canvaError.newError(d, `There is no gifs ever created.`);

        if (name) {
            if (d.data.gifs[name]) {
                let gif = d.data.gifs[name].gif;
                await gif.finish();
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