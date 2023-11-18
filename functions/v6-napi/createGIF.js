const canvaError = require("../../index.js").utils.canvaError;
const GIFEncoder = require('gif-encoder-2');

module.exports = {
    name: "$createGIF",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "gif", w = "512", h = "512"] = data.inside.splits;

        const nGif = new GIFEncoder(Number(w) || 512, Number(h) || 512);

        if (!d.data.gifs) {
            d.data.gifs = {};
        };
        
        d.data.gifs[name] = {
            gif: nGif
        };

        require("../../index.js").canvasData({
            "method": "set",
            "where": "gifs",
            "what": name,
            "value": d.data.gifs[name]
        });

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}